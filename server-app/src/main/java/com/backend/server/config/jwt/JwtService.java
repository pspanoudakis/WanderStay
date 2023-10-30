package com.backend.server.config.jwt;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    String SECRET_KEY;

    public String cleanUpJwt(String jwt) {
        return jwt.replace(JwtConstants.AUTH_BEARER_START, "");
    }

    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
    }

    private Claims findAllClaims(String jwt) throws RuntimeException {
        return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(cleanUpJwt(jwt))
            .getBody();
    }

    public <T> T findClaim(
        String jwt,
        Function<Claims, T> claimExtractor
    ) throws RuntimeException {
        Claims claims = findAllClaims(jwt);
        return claimExtractor.apply(claims);
    }

    public boolean isJwtExpired(String jwt) throws RuntimeException {
        return findClaim(jwt, Claims::getExpiration).before(new Date());
    }   

    public String findUsername(String jwt) throws RuntimeException {
        return findClaim(jwt, Claims::getSubject);
    }
    
    public String generateJwt(
        Map<String, Object> claims,
        UserDetails userDetails
    ) {
        return Jwts
            .builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(
                System.currentTimeMillis() + 1000 * JwtConstants.JWT_SECS_DURATION
            ))
            .signWith(getSignInKey(), JwtConstants.signatureAlgorithm)
            .compact();
    }

    public String generateJwt(UserDetails userDetails) {
        return generateJwt(new HashMap<>(), userDetails);
    }

    public boolean isJwtValid(String jwt, UserDetails userDetails) {
        String username = findUsername(jwt);
        return username.equals(userDetails.getUsername()) && !isJwtExpired(jwt);
    }
    
}

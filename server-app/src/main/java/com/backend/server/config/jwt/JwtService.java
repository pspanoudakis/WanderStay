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
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String SECRET_KEY;
    // make sure byte length is correct!
    private static final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    private static final long JWT_SECS_DURATION = 60;

    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
    }

    private Claims findAllClaims(String jwt) {
        return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(jwt)
            .getBody();
    }

    public <T> T findClaim(String jwt, Function<Claims, T> claimExtractor) {
        Claims claims = findAllClaims(jwt);
        return claimExtractor.apply(claims);
    }

    private boolean isJwtExpired(String jwt) {
        return findClaim(jwt, Claims::getExpiration).before(new Date());
    }   

    public String findUsername(String jwt) {
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
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * JWT_SECS_DURATION))
            .signWith(getSignInKey(), signatureAlgorithm)
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

package com.backend.server.config.jwt;

import org.springframework.context.annotation.Configuration;

import io.jsonwebtoken.SignatureAlgorithm;

@Configuration
class JwtConstants {
    
    public static final String AUTH_BEARER_START = "Bearer ";
    static final int BEARER_CONTENT_IDX_START = AUTH_BEARER_START.length();

    // make sure byte length is correct!
    static final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    static final long JWT_SECS_DURATION = 2*60*60;
}

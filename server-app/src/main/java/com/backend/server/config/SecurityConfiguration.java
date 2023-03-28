package com.backend.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.backend.server.config.jwt.JwtAuthFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    
    private final AuthenticationProvider authProvider;
    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
            // Disabling CORS and CSRF
            .cors()
            .and()
            .csrf()
            .disable()
            
            // *Whitelist* these requests
            .authorizeHttpRequests()
            .requestMatchers("/test/**")
            .permitAll()

            // Authenticate all the other requests
            .anyRequest()
            .authenticated()

            .and()
            // Make session stateless
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

            .and()
            // Use `AuthenticationProvider`
            .authenticationProvider(authProvider)

            // Use `JwtAuthFilter`
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

            // Done.
            .build();
    }

}

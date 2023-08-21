package com.backend.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.backend.server.config.jwt.JwtAuthFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    
    private final AuthenticationProvider authProvider;
    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                    .addMapping("/**")
                    .exposedHeaders(CorsConfiguration.ALL, "Authentication")
                    .allowedOriginPatterns(CorsConfiguration.ALL)
                    .allowedMethods(CorsConfiguration.ALL);
            }
        };
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
            // Enable CORS and Disable CSRF
            .cors()
            .and()
            .csrf()
            .disable()
            
            // *Whitelist* these requests
            .authorizeHttpRequests()
            .requestMatchers(
                "/auth/register",
                "/auth/login",
                "/location/**",
                "/property/*",
                // "/property/search",
                // "/property/*/review*",
                "/property/*/reviewsSummary",
                "/images/**"
            )
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

package com.aigovernmentscheme.backend.config;

<<<<<<< ours
import com.aigovernmentscheme.backend.service.JwtService;
import com.aigovernmentscheme.backend.repository.UserRepository;
=======
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
>>>>>>> theirs
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
<<<<<<< ours
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
=======
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
>>>>>>> theirs

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

<<<<<<< ours
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtService jwtService,
                                   UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
=======
    @Value("${JWT_SECRET}")
    private String secretKey;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(
                secretKey.getBytes(StandardCharsets.UTF_8)
        );
>>>>>>> theirs
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
<<<<<<< ours
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

=======
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // If there is no JWT token, continue the request
>>>>>>> theirs
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

<<<<<<< ours
        if (jwtService.isTokenValid(token)) {

            String email = jwtService.extractEmail(token);

            userRepository.findByEmail(email).ifPresent(user -> {

                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                    email,
                    null,
                    java.util.Collections.emptyList()
                );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);
            });
        }

=======
        try {
            // Validate JWT token
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            // Get email from JWT subject
            String email = claims.getSubject();

            // Create authenticated user
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            Collections.emptyList()
                    );

            // Store authentication in Spring Security context
            SecurityContextHolder.getContext()
                    .setAuthentication(authentication);

        } catch (Exception e) {

            // Invalid or expired token
            SecurityContextHolder.clearContext();
        }

        // Continue request
>>>>>>> theirs
        filterChain.doFilter(request, response);
    }
}
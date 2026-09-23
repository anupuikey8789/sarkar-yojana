package com.aigovernmentscheme.backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
<<<<<<< ours
=======
import org.springframework.beans.factory.annotation.Value;
>>>>>>> theirs
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

<<<<<<< ours
    private final String secretKey =
            "AI_Government_Scheme_Finder_Secret_Key_2026_Secure";
=======
    @Value("${JWT_SECRET}")
    private String secretKey;
>>>>>>> theirs

    private final long expirationTime = 1000 * 60 * 60;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(
                secretKey.getBytes(StandardCharsets.UTF_8)
        );
    }

    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSigningKey())
                .compact();
    }
<<<<<<< ours

    public String extractEmail(String token) {

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean isTokenValid(String token) {

        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);

            return true;

        } catch (Exception e) {
            return false;
        }
    }
=======
>>>>>>> theirs
}
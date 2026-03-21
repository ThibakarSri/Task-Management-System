//package com.taskmanager.security;
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import javax.crypto.SecretKey;
//import java.util.Date;
//
//@Component
//public class JwtUtil {
//
//    @Value("${app.jwt.secret:your-secret-key-change-this-in-production-at-least-32-characters}")
//    private String jwtSecret;
//
//    @Value("${app.jwt.expiration:86400000}")
//    private long jwtExpirationMs = 86400000; // 24 hours
//
//    public String generateToken(String username, Long userId) {
//        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
//
//        return Jwts.builder()
//                .setSubject(username)
//                .claim("userId", userId)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
//                .signWith(key, SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//    public String getUsernameFromToken(String token) {
//        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
//
//        return Jwts.parserBuilder()
//                .setSigningKey(key)
//                .build()
//                .parseClaimsJws(token)
//                .getBody()
//                .getSubject();
//    }
//
//    public Long getUserIdFromToken(String token) {
//        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
//
//        return Long.valueOf(
//                Jwts.parserBuilder()
//                        .setSigningKey(key)
//                        .build()
//                        .parseClaimsJws(token)
//                        .getBody()
//                        .get("userId")
//                        .toString()
//        );
//    }
//
//    public boolean validateToken(String token) {
//        try {
//            SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
//            Jwts.parserBuilder()
//                    .setSigningKey(key)
//                    .build()
//                    .parseClaimsJws(token);
//            return true;
//        } catch (Exception e) {
//            return false;
//        }
//    }
//}

package com.taskmanager.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private long jwtExpiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    /**
     * Generate JWT token
     */
    public String generateToken(String username, Long userId) {
        return Jwts.builder()
                .setSubject(username)
                .claim("userId", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    public String getUsername(String token) {
        return getClaims(token).getSubject();
    }


    public Long getUserId(String token) {
        return getClaims(token).get("userId", Long.class);
    }


    public boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Get all claims from token
     */
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Check if token is expired
     */
    public boolean isTokenExpired(String token) {
        try {
            return getClaims(token).getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }
}
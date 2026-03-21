package com.taskmanager.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.core.log.LogMessage;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired(required = false)
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestUri = request.getRequestURI();
        String servletPath = request.getServletPath();

        logger.debug(LogMessage.format("JwtAuthFilter processing - URI: %s, ServletPath: %s", requestUri, servletPath));

        // Skip JWT filter for public auth endpoints
        // Check both full URI and servlet path
        if (servletPath.endsWith("/auth/register") || servletPath.endsWith("/auth/login") ||
                requestUri.endsWith("/auth/register") || requestUri.endsWith("/auth/login")) {

            logger.debug(LogMessage.format("Skipping JWT filter for auth endpoint: %s", servletPath));
            filterChain.doFilter(request, response);
            return;
        }

        // Only process JWT if we have tasks endpoints
        if (servletPath.contains("/tasks") || requestUri.contains("/tasks")) {
            String authHeader = request.getHeader("Authorization");

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);

                try {
                    if (jwtUtil != null && jwtUtil.validateToken(token)) {
                        String username = jwtUtil.getUsername(token);
                        Long userId = jwtUtil.getUserId(token);

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(username, null, null);

                        request.setAttribute("userId", userId);
                        SecurityContextHolder.getContext().setAuthentication(authentication);

                        logger.debug(LogMessage.format("JWT validated for user: %s", username));
                    }
                } catch (Exception e) {
                    logger.debug(LogMessage.format("JWT validation failed: %s", e.getMessage()));
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
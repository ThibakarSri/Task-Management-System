package com.taskmanager.service;

import com.taskmanager.dto.AuthRequest;
import com.taskmanager.dto.AuthResponse;
import com.taskmanager.entity.User;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(AuthRequest request) throws Exception {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new Exception("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setActive(true);
        user.setRole("USER");

        user = userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername(), user.getId());

        return new AuthResponse(token, user.getUsername(), "User registered successfully", user.getId());
    }

    public AuthResponse login(AuthRequest request) throws Exception {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new Exception("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new Exception("Invalid password");
        }

        if (!user.isActive()) {
            throw new Exception("User account is inactive");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getId());

        return new AuthResponse(token, user.getUsername(), "Login successful", user.getId());
    }
}
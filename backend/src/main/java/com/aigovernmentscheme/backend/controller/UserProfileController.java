package com.aigovernmentscheme.backend.controller;

import com.aigovernmentscheme.backend.entity.User;
import com.aigovernmentscheme.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {

    private final UserService userService;

    public UserProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        return ResponseEntity.ok(
                Map.of(
                        "userId", user.getUserId(),
                        "fullName", user.getFullName(),
                        "email", user.getEmail()
                )
        );
    }
}
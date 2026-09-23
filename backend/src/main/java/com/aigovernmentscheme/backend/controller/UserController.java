package com.aigovernmentscheme.backend.controller;

import com.aigovernmentscheme.backend.entity.User;
import com.aigovernmentscheme.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
<<<<<<< ours
import org.springframework.security.core.Authentication;
import com.aigovernmentscheme.backend.dto.UserProfileResponse;
=======
>>>>>>> theirs

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
            @RequestBody Map<String, String> loginRequest) {

        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        String token = userService.loginUser(email, password);

        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "token", token
        ));
    }
<<<<<<< ours

    @GetMapping("/profile")
        public ResponseEntity<UserProfileResponse> getProfile(Authentication authentication) {

        String email = authentication.getName();

        UserProfileResponse profile = userService.getUserProfile(email);

        return ResponseEntity.ok(profile);
    }
=======
>>>>>>> theirs
}
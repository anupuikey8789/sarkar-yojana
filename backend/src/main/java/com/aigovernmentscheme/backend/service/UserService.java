package com.aigovernmentscheme.backend.service;

import com.aigovernmentscheme.backend.dto.UserProfileResponse;
import com.aigovernmentscheme.backend.dto.UserProfileUpdateRequest;
import com.aigovernmentscheme.backend.entity.User;
import com.aigovernmentscheme.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public UserProfileResponse registerUser(User user) {
        String email = normalizeEmail(user.getEmail());
        if (email == null || email.isBlank() || user.getPassword() == null || user.getPassword().isBlank()) {
            throw new IllegalArgumentException("Name, email, and password are required");
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalStateException("Email already registered");
        }
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return toProfile(userRepository.save(user));
    }

    @Transactional
    public String loginUser(String email, String password) {
        String normalizedEmail = normalizeEmail(email);
        if (normalizedEmail == null || password == null) {
            throw new IllegalArgumentException("Email and password are required");
        }
        var credentials = userRepository.findCredentialsByEmail(normalizedEmail)
                .orElseThrow(() -> new InvalidCredentialsException());
        String storedPassword = credentials.getPassword();

        boolean valid;
        if (isBcryptHash(storedPassword)) {
            try {
                valid = passwordEncoder.matches(password, storedPassword);
            } catch (IllegalArgumentException ignored) {
                valid = false;
            }
        } else {
            // One-time compatibility path for older plaintext rows: successful login immediately upgrades the hash.
            valid = storedPassword != null && storedPassword.equals(password);
            if (valid) {
                userRepository.updatePasswordByEmail(normalizedEmail, passwordEncoder.encode(password));
            }
        }
        if (!valid) {
            throw new InvalidCredentialsException();
        }
        return jwtService.generateToken(credentials.getEmail());
    }

    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(normalizeEmail(email))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getUserProfile(String email) {
        return toProfile(getUserByEmail(email));
    }

    @Transactional
    public UserProfileResponse updateUserProfile(String email, UserProfileUpdateRequest request) {
        User user = getUserByEmail(email);
        user.setFullName(request.getFullName());
        user.setMobile(request.getMobile());
        user.setAge(request.getAge());
        user.setGender(request.getGender());
        user.setState(request.getState());
        user.setDistrict(request.getDistrict());
        user.setCategory(request.getCategory());
        user.setOccupation(request.getOccupation());
        user.setAnnualIncome(request.getAnnualIncome());
        user.setEducation(request.getEducation());
        user.setDisability(request.getDisability());
        return toProfile(userRepository.save(user));
    }

    private UserProfileResponse toProfile(User user) {
        UserProfileResponse response = new UserProfileResponse();
        response.setUserId(user.getUserId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setMobile(user.getMobile());
        response.setAge(user.getAge());
        response.setGender(user.getGender());
        response.setState(user.getState());
        response.setDistrict(user.getDistrict());
        response.setCategory(user.getCategory());
        response.setOccupation(user.getOccupation());
        response.setAnnualIncome(user.getAnnualIncome());
        response.setEducation(user.getEducation());
        response.setDisability(user.getDisability());
        return response;
    }

    private String normalizeEmail(String email) {
        return email == null ? null : email.trim().toLowerCase(Locale.ROOT);
    }

    private boolean isBcryptHash(String value) {
        return value != null && value.matches("\\$2[aby]\\$\\d{2}\\$.*");
    }
}

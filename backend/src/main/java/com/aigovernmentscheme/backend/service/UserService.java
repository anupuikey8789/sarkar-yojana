package com.aigovernmentscheme.backend.service;

import com.aigovernmentscheme.backend.entity.User;
import com.aigovernmentscheme.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
<<<<<<< ours
import com.aigovernmentscheme.backend.dto.UserProfileResponse;
import com.aigovernmentscheme.backend.dto.UserProfileUpdateRequest;
=======
>>>>>>> theirs

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public String loginUser(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return jwtService.generateToken(user.getEmail());
    }
<<<<<<< ours

    public User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserProfileResponse getUserProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

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

    public UserProfileResponse updateUserProfile(
        String email,
        UserProfileUpdateRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

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

        userRepository.save(user);

        return getUserProfile(email);
    }
=======
    public User getUserByEmail(String email) {

    return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
}
>>>>>>> theirs
}
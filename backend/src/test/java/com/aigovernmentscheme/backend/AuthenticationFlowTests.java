package com.aigovernmentscheme.backend;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.aigovernmentscheme.backend.entity.User;
import com.aigovernmentscheme.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthenticationFlowTests {
    @Autowired private MockMvc mockMvc;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void registerLoginAndUseBearerToken() throws Exception {
        String email = "login-check@example.test";
        String password = "correct-horse-battery";
        String registration = objectMapper.createObjectNode()
                .put("fullName", "Login Check")
                .put("email", email)
                .put("password", password)
                .toString();

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registration))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.password").doesNotExist());

        String login = objectMapper.createObjectNode()
                .put("email", "  LOGIN-CHECK@EXAMPLE.TEST ")
                .put("password", password)
                .toString();
        String loginResponse = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(login))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        JsonNode response = objectMapper.readTree(loginResponse);
        String token = response.get("token").asText();

        mockMvc.perform(get("/api/user/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.fullName").value("Login Check"));

        String wrongPassword = objectMapper.createObjectNode()
                .put("email", email)
                .put("password", "wrong-password")
                .toString();
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(wrongPassword))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Invalid email or password"));

        var storedCredentials = userRepository.findCredentialsByEmail(email).orElseThrow();
        org.junit.jupiter.api.Assertions.assertNotEquals(password, storedCredentials.getPassword());
        org.junit.jupiter.api.Assertions.assertTrue(passwordEncoder.matches(password, storedCredentials.getPassword()));
    }

    @Test
    void upgradesLegacyPlaintextPasswordAfterSuccessfulLogin() throws Exception {
        User legacyUser = new User();
        legacyUser.setFullName("Legacy Login");
        legacyUser.setEmail("legacy-login@example.test");
        legacyUser.setPassword("legacy-password");
        userRepository.save(legacyUser);

        String request = objectMapper.createObjectNode()
                .put("email", legacyUser.getEmail())
                .put("password", "legacy-password")
                .toString();
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty());

        var upgraded = userRepository.findCredentialsByEmail(legacyUser.getEmail()).orElseThrow();
        org.junit.jupiter.api.Assertions.assertNotEquals("legacy-password", upgraded.getPassword());
        org.junit.jupiter.api.Assertions.assertTrue(passwordEncoder.matches("legacy-password", upgraded.getPassword()));
    }
}

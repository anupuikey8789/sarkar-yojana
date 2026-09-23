package com.aigovernmentscheme.backend.controller;

import com.aigovernmentscheme.backend.entity.AssessmentAnswer;
import com.aigovernmentscheme.backend.entity.User;
import com.aigovernmentscheme.backend.repository.UserRepository;
import com.aigovernmentscheme.backend.service.AssessmentAnswerService;
import com.aigovernmentscheme.backend.service.AssessmentAnswerService.AnswerData;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentAnswerController {

    private final AssessmentAnswerService assessmentAnswerService;
    private final UserRepository userRepository;

    public AssessmentAnswerController(
            AssessmentAnswerService assessmentAnswerService,
            UserRepository userRepository) {

        this.assessmentAnswerService = assessmentAnswerService;
        this.userRepository = userRepository;
    }

    @PostMapping("/{assessmentId}/answers")
    public ResponseEntity<List<AssessmentAnswer>> saveAnswers(
            @PathVariable Integer assessmentId,
            @RequestBody List<AnswerData> answers,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<AssessmentAnswer> savedAnswers =
                assessmentAnswerService.saveAnswers(
                        assessmentId,
                        user.getUserId(),
                        answers
                );

        return ResponseEntity.ok(savedAnswers);
    }

    @GetMapping("/{assessmentId}/answers")
    public ResponseEntity<List<AssessmentAnswer>> getAnswers(
            @PathVariable Integer assessmentId,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<AssessmentAnswer> answers =
                assessmentAnswerService.getAnswers(
                        assessmentId,
                        user.getUserId()
                );

        return ResponseEntity.ok(answers);
    }
}
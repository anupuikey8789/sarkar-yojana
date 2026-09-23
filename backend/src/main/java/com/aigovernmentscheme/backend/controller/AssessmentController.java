package com.aigovernmentscheme.backend.controller;

import com.aigovernmentscheme.backend.entity.Assessment;
import com.aigovernmentscheme.backend.service.AssessmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    private final AssessmentService assessmentService;

    public AssessmentController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    @PostMapping("/start")
    public ResponseEntity<Assessment> startAssessment(
            Authentication authentication) {

        String email = authentication.getName();

        Assessment assessment =
                assessmentService.startAssessment(email);

        return ResponseEntity.ok(assessment);
    }

    @GetMapping("/latest")
    public ResponseEntity<Assessment> getLatestAssessment(
            Authentication authentication) {

        String email = authentication.getName();

        Assessment assessment =
                assessmentService.getLatestAssessment(email);

        return ResponseEntity.ok(assessment);
    }
}
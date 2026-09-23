package com.aigovernmentscheme.backend.service;

import com.aigovernmentscheme.backend.entity.Assessment;
import com.aigovernmentscheme.backend.entity.User;
import com.aigovernmentscheme.backend.repository.AssessmentRepository;
import com.aigovernmentscheme.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final UserRepository userRepository;

    public AssessmentService(
            AssessmentRepository assessmentRepository,
            UserRepository userRepository) {

        this.assessmentRepository = assessmentRepository;
        this.userRepository = userRepository;
    }

    public Assessment startAssessment(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Assessment assessment = new Assessment();

        assessment.setUserId(user.getUserId());

        return assessmentRepository.save(assessment);
    }

    public Assessment getLatestAssessment(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return assessmentRepository
                .findFirstByUserIdOrderByAssessmentIdDesc(user.getUserId())
                .orElseThrow(() -> new RuntimeException("No assessment found"));
    }
}
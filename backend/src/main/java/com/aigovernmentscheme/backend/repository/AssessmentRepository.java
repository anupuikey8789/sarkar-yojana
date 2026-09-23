package com.aigovernmentscheme.backend.repository;

import com.aigovernmentscheme.backend.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AssessmentRepository extends JpaRepository<Assessment, Integer> {

    Optional<Assessment> findByAssessmentIdAndUserId(
            Integer assessmentId,
            Integer userId
    );

    Optional<Assessment> findFirstByUserIdOrderByAssessmentIdDesc(
            Integer userId
    );
}
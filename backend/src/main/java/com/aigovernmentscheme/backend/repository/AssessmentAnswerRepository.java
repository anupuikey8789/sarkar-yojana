package com.aigovernmentscheme.backend.repository;

import com.aigovernmentscheme.backend.entity.AssessmentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssessmentAnswerRepository
        extends JpaRepository<AssessmentAnswer, Integer> {

    List<AssessmentAnswer> findByAssessmentId(Integer assessmentId);

    void deleteByAssessmentId(Integer assessmentId);
}
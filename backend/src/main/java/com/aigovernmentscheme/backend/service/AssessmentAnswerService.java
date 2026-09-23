package com.aigovernmentscheme.backend.service;

import com.aigovernmentscheme.backend.entity.Assessment;
import com.aigovernmentscheme.backend.entity.AssessmentAnswer;
import com.aigovernmentscheme.backend.repository.AssessmentAnswerRepository;
import com.aigovernmentscheme.backend.repository.AssessmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AssessmentAnswerService {

    private final AssessmentAnswerRepository assessmentAnswerRepository;
    private final AssessmentRepository assessmentRepository;

    public AssessmentAnswerService(
            AssessmentAnswerRepository assessmentAnswerRepository,
            AssessmentRepository assessmentRepository) {

        this.assessmentAnswerRepository = assessmentAnswerRepository;
        this.assessmentRepository = assessmentRepository;
    }

    @Transactional
    public List<AssessmentAnswer> saveAnswers(
            Integer assessmentId,
            Integer userId,
            List<AnswerData> answers) {

        // Find the assessment belonging to the logged-in user
        Assessment assessment = assessmentRepository
                .findByAssessmentIdAndUserId(assessmentId, userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Assessment not found for this user"
                        ));

        // Remove previously saved answers for this assessment
        assessmentAnswerRepository.deleteByAssessmentId(
                assessment.getAssessmentId()
        );

        List<AssessmentAnswer> answerEntities = new ArrayList<>();

        // Convert request data into database entities
        for (AnswerData answer : answers) {

            if (answer.questionId() == null) {
                throw new RuntimeException("Question ID is required");
            }

            AssessmentAnswer entity = new AssessmentAnswer();

            entity.setAssessmentId(assessmentId);
            entity.setQuestionId(answer.questionId());
            entity.setAnswerValue(answer.answerValue());

            answerEntities.add(entity);
        }

        // Save all assessment answers
        List<AssessmentAnswer> savedAnswers =
                assessmentAnswerRepository.saveAll(answerEntities);

        // Mark the assessment as completed
        assessment.setCompletedAt(LocalDateTime.now());

        // Save the completed assessment
        assessmentRepository.save(assessment);

        return savedAnswers;
    }

    public List<AssessmentAnswer> getAnswers(
            Integer assessmentId,
            Integer userId) {

        assessmentRepository.findByAssessmentIdAndUserId(
                assessmentId,
                userId
        ).orElseThrow(() ->
                new RuntimeException(
                        "Assessment not found for this user"
                ));

        return assessmentAnswerRepository
                .findByAssessmentId(assessmentId);
    }

    public record AnswerData(
            Integer questionId,
            String answerValue
    ) {
    }
}
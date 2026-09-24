package com.aigovernmentscheme.backend.repository;

import com.aigovernmentscheme.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    @Query(value = "SELECT email, password FROM users WHERE LOWER(email) = LOWER(:email) LIMIT 1", nativeQuery = true)
    Optional<UserCredentials> findCredentialsByEmail(@Param("email") String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE users SET password = :password WHERE LOWER(email) = LOWER(:email)", nativeQuery = true)
    int updatePasswordByEmail(@Param("email") String email, @Param("password") String password);

    boolean existsByEmail(String email);
}

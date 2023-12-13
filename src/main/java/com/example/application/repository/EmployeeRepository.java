package com.example.application.repository;

import com.example.application.model.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findOneByUsername(String username);
}

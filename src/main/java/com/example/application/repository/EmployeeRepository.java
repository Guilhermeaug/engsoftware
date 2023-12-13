package com.example.application.repository;

import com.example.application.model.entity.Doctor;
import com.example.application.model.entity.Employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;


public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {
    Optional<Employee> findOneByEmail(String email);
    List<Employee> findAllByRoles(String role);
}

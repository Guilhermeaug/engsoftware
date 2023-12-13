package com.example.application.repository;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.example.application.model.entity.Schedule;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long>, JpaSpecificationExecutor<Schedule> {
    List<Schedule> findAllByDoctor_CodeAndDate(Long doctor_code, LocalDate date);
    List<Schedule> findAllByDoctor_Code(Long doctor_code);
}

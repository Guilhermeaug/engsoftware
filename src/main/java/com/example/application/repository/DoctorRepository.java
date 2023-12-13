package com.example.application.repository;

import com.example.application.model.entity.Doctor;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
  Optional<List<Doctor>> findAllBySpeciality(String speciality);
}

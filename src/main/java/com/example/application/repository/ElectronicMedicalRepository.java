package com.example.application.repository;

import com.example.application.model.entity.ElectronicMedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ElectronicMedicalRepository extends JpaRepository<ElectronicMedicalRecord, Long> {
}

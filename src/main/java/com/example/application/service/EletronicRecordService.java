package com.example.application.service;

import com.example.application.model.entity.Doctor;
import com.example.application.model.entity.ElectronicMedicalRecord;
import com.example.application.model.entity.Patient;
import com.example.application.repository.DoctorRepository;
import com.example.application.repository.ElectronicMedicalRepository;
import com.example.application.repository.PatientRepository;
import dev.hilla.BrowserCallable;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
@PermitAll
@BrowserCallable
public class EletronicRecordService {
    private final PatientRepository patientRepository;
    private final ElectronicMedicalRepository electronicMedicalRepository;

    public ElectronicMedicalRecord save(@Valid ElectronicMedicalRecord electronicMedicalRecord, Long patientCode) {
        Optional<Patient> patient = patientRepository.findById(patientCode);
        if (patient.isEmpty()) {
            throw new RuntimeException("Patient not found");
        }
        electronicMedicalRecord.setPatient(patient.get());
        return electronicMedicalRepository.save(electronicMedicalRecord);
    }
}

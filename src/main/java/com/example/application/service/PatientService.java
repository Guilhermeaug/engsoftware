package com.example.application.service;

import com.example.application.model.entity.Employee;
import com.example.application.model.entity.Patient;
import com.example.application.repository.EmployeeRepository;
import com.example.application.repository.PatientRepository;
import dev.hilla.BrowserCallable;
import dev.hilla.Nullable;
import dev.hilla.crud.ListRepositoryService;
import dev.hilla.crud.filter.Filter;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;

import java.util.List;

@PermitAll
@RequiredArgsConstructor
@BrowserCallable
public class PatientService extends ListRepositoryService<Patient, Long, PatientRepository> {
    private final PatientRepository patientRepository;

    public Patient save(@Valid Patient patient) {
        return patientRepository.save(patient);
    }

    public List<Patient> findAll() {
        return patientRepository.findAll();
    }

    @PermitAll
    @Override
    public List<Patient> list(Pageable pageable, @Nullable Filter filter) {
        return super.list(pageable, filter);
    }
}

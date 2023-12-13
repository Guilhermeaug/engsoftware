package com.example.application.service;

import dev.hilla.BrowserCallable;
import dev.hilla.Nullable;
import dev.hilla.crud.ListRepositoryService;
import dev.hilla.crud.filter.Filter;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.application.model.Role;
import com.example.application.model.entity.Doctor;
import com.example.application.model.entity.Employee;
import com.example.application.repository.DoctorRepository;
import com.example.application.repository.EmployeeRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@RequiredArgsConstructor
@BrowserCallable
public class EmployeeService extends ListRepositoryService<Employee, Long, EmployeeRepository> {
  private final EmployeeRepository employeeRepository;
  private final DoctorRepository doctorRepository;
  private final PasswordEncoder passwordEncoder;

  @PermitAll
  public Employee save(@Valid Employee employee) {
    employee.setHashPassword(passwordEncoder.encode(employee.getHashPassword()));
    employee.setRoles(Set.of(Role.ADMIN));
    return employeeRepository.save(employee);
  }

  @PermitAll
  public Employee saveDoctor(@Valid Doctor employee) {
    employee.setHashPassword(passwordEncoder.encode(employee.getHashPassword()));
    employee.setRoles(Set.of(Role.DOCTOR));
    return employeeRepository.save(employee);
  }

  @AnonymousAllowed
  public List<String> findAllSpecialities() {
    return doctorRepository.findAll().stream().map(Doctor::getSpeciality).toList();
  }

  @AnonymousAllowed
  public List<Doctor> findAllDoctorsBySpeciality(String speciality) {
    return doctorRepository.findAllBySpeciality(speciality).orElseThrow().stream().toList();
  }

  @PermitAll
  @Override
  public List<Employee> list(Pageable pageable, @Nullable Filter filter) {
    return super.list(pageable, filter);
  }
}

package com.example.application.security;

import com.example.application.model.entity.Employee;
import com.example.application.repository.EmployeeRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.flow.spring.security.AuthenticationContext;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;

import java.util.Optional;

@RequiredArgsConstructor
@Endpoint
@AnonymousAllowed
public class UserInfoService {
    private final AuthenticationContext authenticationContext;
    private final EmployeeRepository employeeRepository;

    @PermitAll
    @Nonnull
    public Optional<Employee> getAuthenticatedEmployee() {
        return authenticationContext
                .getAuthenticatedUser(User.class)
                .flatMap(value -> employeeRepository.findOneByUsername(value.getUsername()));
    }
}

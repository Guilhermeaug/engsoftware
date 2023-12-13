package com.example.application.security;

import com.example.application.model.entity.Employee;
import com.example.application.repository.EmployeeRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.flow.spring.security.AuthenticationContext;
import dev.hilla.BrowserCallable;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@BrowserCallable
@AnonymousAllowed
public class UserInfoEndpoint {
    private final AuthenticationContext authenticationContext;
    private final EmployeeRepository employeeRepository;

    @Nonnull
    public Optional<Employee> getAuthenticatedEmployee() {
        return authenticationContext
                .getAuthenticatedUser(User.class)
                .flatMap(value -> employeeRepository.findOneByEmail(value.getUsername()));
    }
}

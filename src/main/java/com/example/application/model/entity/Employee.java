package com.example.application.model.entity;

import com.example.application.model.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Employee extends Person {
    @NotNull(message = "Data do contrato é obrigatória")
    @Column(nullable = false)
    private LocalDate contractDate;

    @NotNull(message = "Salário é obrigatório")
    @Column(nullable = false)
    private Long salary;

    @NotBlank(message = "Senha é obrigatória")
    @Column(nullable = false)
    private String hashPassword;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> roles;
}

package com.example.application.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class Doctor extends Employee {
    @NotBlank(message = "Especialidade é obrigatório")
    @Column(nullable = false)
    private String speciality;

    @NotBlank(message = "CRM é obrigatório")
    @Column(nullable = false)
    private String CRM;
}
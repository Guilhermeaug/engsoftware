package com.example.application.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class ElectronicMedicalRecord {
    @Id
    @GeneratedValue()
    private Long code;

    @NotBlank(message = "Anamnese é obrigatório")
    @Column(nullable = false)
    private String anamnesis;

    @NotBlank(message = "Medicamentos é obrigatório")
    @Column(nullable = false)
    private String medicines;

    private String certificates;

    private String exams;

    @ManyToOne
    private Patient patient;
}
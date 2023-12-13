package com.example.application.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class Schedule {
    @Id
    @GeneratedValue()
    private Long code;

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    @Column(nullable = false)
    private String email;

    @NotBlank(message = "Telefone é obrigatório")
    @Column(nullable = false)
    private String phone;

    @NotNull(message = "Data é obrigatório")
    @Column(nullable = false)
    private LocalDate date;

    @NotNull(message = "Horário é obrigatório")
    @Column(nullable = false)
    private Integer time;

    @ManyToOne
    private Doctor doctor;
}
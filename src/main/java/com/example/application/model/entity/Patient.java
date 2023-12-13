package com.example.application.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class Patient extends Person {
    @NotNull(message = "Peso é obrigatório")
    @Column(nullable = false)
    private Float weight;

    @NotNull(message = "Altura é obrigatório")
    @Column(nullable = false)
    private Float height;

    @NotBlank(message = "Tipo sanguíneo é obrigatório")
    @Column(nullable = false)
    private String bloodType;
}
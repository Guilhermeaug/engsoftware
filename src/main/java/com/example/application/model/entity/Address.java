package com.example.application.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class Address {
    @Id
    @GeneratedValue()
    private Long code;

    @NotBlank(message = "Preencha o seu logradouro corretamente")
    @Column(nullable = false)
    private String street;

    @NotBlank(message = "Preencha o seu bairro corretamente")
    @Column(nullable = false)
    private String neighborhood;

    @NotBlank(message = "Preencha a sua cidade corretamente")
    @Column(nullable = false)
    private String city;

    @NotBlank(message = "Preencha o seu estado corretamente")
    @Column(nullable = false)
    private String state;

    @NotBlank(message = "Preencha o seu CEP corretamente")
    @Column(nullable = false, unique = true)
    private String zipCode;
}
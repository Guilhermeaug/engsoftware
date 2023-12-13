package com.example.application.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@MappedSuperclass
public class Person {
    @Id
    @GeneratedValue()
    private Long code;

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Telefone é obrigatório")
    @Column(nullable = false)
    private String phone;

    @NotBlank(message = "CEP é obrigatório")
    @Column(nullable = false)
    private String zipcode;

    @NotBlank(message = "Rua é obrigatório")
    @Column(nullable = false)
    private String street;

    @NotBlank(message = "Bairro é obrigatório")
    @Column(nullable = false)
    private String neighborhood;

    @NotBlank(message = "Cidade é obrigatório")
    @Column(nullable = false)
    private String city;

    @NotBlank(message = "Estado é obrigatório")
    @Column(nullable = false)
    private String state;
}

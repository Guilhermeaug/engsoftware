package com.example.application.service;

import java.util.List;
import java.util.Optional;

import com.example.application.model.entity.Patient;
import com.example.application.repository.PatientRepository;
import dev.hilla.crud.ListRepositoryService;
import org.springframework.stereotype.Service;

import com.example.application.model.entity.Address;
import com.example.application.repository.AddressRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.BrowserCallable;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@BrowserCallable
@AnonymousAllowed
public class AddressService extends ListRepositoryService<Address, Long, AddressRepository> {
  private final AddressRepository addressRepository;

  public Address save(@Valid Address address) {
    return addressRepository.save(address);
  }

  public List<Address> findAll() {
    return addressRepository.findAll();
  }

  public Optional<Address> findOneByZipCode(String zipCode) {
    return addressRepository.findOneByZipCode(zipCode);
  }
}

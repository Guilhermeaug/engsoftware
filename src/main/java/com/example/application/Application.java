package com.example.application;

import com.example.application.model.Role;
import com.example.application.model.entity.Doctor;
import com.example.application.model.entity.Employee;
import com.example.application.model.entity.Patient;
import com.example.application.service.EmployeeService;
import com.example.application.service.PatientService;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Set;

/**
 * The entry point of the Spring Boot application.
 * <p>
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 */
@SpringBootApplication
@Theme(value = "engsoftware")
public class Application implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner runner(EmployeeService employeeService, PatientService patientService, PasswordEncoder passwordEncoder) {
        return args -> {
            Employee admin = new Employee();
            admin.setName("Admin");
            admin.setEmail("admin@integral.com");
            admin.setPhone("123456789");
            admin.setZipcode("12345678");
            admin.setStreet("Rua 1");
            admin.setNeighborhood("Bairro 1");
            admin.setCity("Cidade 1");
            admin.setState("Estado 1");
            admin.setContractDate(LocalDate.now());
            admin.setSalary(100000L);
            admin.setHashPassword("admin");
            employeeService.save(admin);

            Doctor doctor = new Doctor();
            doctor.setName("Manoel Gomes");
            doctor.setEmail("manoel@integral.com");
            doctor.setPhone("123456789");
            doctor.setZipcode("12345678");
            doctor.setStreet("Rua 1");
            doctor.setNeighborhood("Bairro 1");
            doctor.setCity("Cidade 1");
            doctor.setState("Estado 1");
            doctor.setContractDate(LocalDate.now());
            doctor.setSalary(200000L);
            doctor.setHashPassword("admin");
            doctor.setSpeciality("Cardiologista");
            doctor.setCRM("123456");
            employeeService.saveDoctor(doctor);

            Patient patient = new Patient();
            patient.setName("Guilherme");
            patient.setEmail("guilherme@gmail.com");
            patient.setPhone("123456789");
            patient.setZipcode("12345678");
            patient.setStreet("Rua 1");
            patient.setNeighborhood("Bairro 1");
            patient.setCity("Cidade 1");
            patient.setState("Estado 1");
            patient.setBloodType("A+");
            patient.setWeight(80F);
            patient.setHeight(1.80F);
            patientService.save(patient);
        };
    }
}

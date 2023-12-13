package com.example.application.service;

import com.example.application.model.entity.Doctor;
import com.example.application.model.entity.Schedule;
import com.example.application.repository.DoctorRepository;
import com.example.application.repository.ScheduleRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.crud.ListRepositoryService;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RequiredArgsConstructor
@AnonymousAllowed
@BrowserCallable
public class ScheduleService extends ListRepositoryService<Schedule, Long, ScheduleRepository> {
    private final ScheduleRepository scheduleRepository;
    private final DoctorRepository doctorRepository;

    public Schedule save(Schedule schedule, Long doctorCode) {
        Optional<Doctor> doctor = doctorRepository.findById(doctorCode);
        if (doctor.isEmpty()) {
            throw new RuntimeException("Médico não encontrado");
        }
        schedule.setDoctor(doctor.get());
        return scheduleRepository.save(schedule);
    }

    public List<Integer> findAvaliableSchedule(Long doctorCode, LocalDate date) {
        var schedules = scheduleRepository.findAllByDoctor_CodeAndDate(doctorCode, date);
        return Stream.of(8, 9, 10, 11, 12, 13, 14, 15, 16, 17)
                .filter(time -> schedules.stream().noneMatch(schedule -> schedule.getTime() == time))
                .collect(Collectors.toList());
    }

    public List<Schedule> findDoctorSchedules(Long doctorCode) {
        return scheduleRepository.findAllByDoctor_Code(doctorCode);
    }
}

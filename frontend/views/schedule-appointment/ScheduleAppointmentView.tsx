import { DatePicker } from "@hilla/react-components/DatePicker.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { useForm } from "@hilla/react-form";
import { Notification } from "@hilla/react-components/Notification.js";
import { useState } from "react";
import { ScheduleService } from "Frontend/generated/endpoints";
import ScheduleModel from "Frontend/generated/com/example/application/model/entity/ScheduleModel";
import { Button } from "@hilla/react-components/Button.js";
import { responsiveSteps } from "Frontend/util/types";
import TimeField from "Frontend/views/schedule-appointment/TimeField";
import SpecialityField from "Frontend/views/schedule-appointment/SpecialityField";
import DoctorField from "Frontend/views/schedule-appointment/DoctorField";

export default function ScheduleAppointmentView() {
  const { model, field, submit, value, reset } = useForm(ScheduleModel, {
    onSubmit: async (value) => {
      try {
        await ScheduleService.save(value, parseInt(selectedDoctor));
        reset();
        Notification.show("Agendamento feito com sucesso", {
          position: "bottom-center",
          theme: "sucess",
        });
      } catch (error) {
        Notification.show("Erro ao agendar consulta", {
          position: "bottom-center",
          theme: "error",
        });
      }
    },
  });

  const [selectedSpeciality, setSelectedSpeciality] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");

  return (
    <main className="p-m flex flex-col gap-l">
      <div>
        <h2>Agendamento da Consulta</h2>
        <FormLayout responsiveSteps={responsiveSteps}>
          <SpecialityField
            selectedSpeciality={selectedSpeciality}
            setSelectedSpeciality={setSelectedSpeciality}
          />
          {selectedSpeciality && (
            <>
              <DoctorField
                selectedSpeciality={selectedSpeciality}
                selectedDoctor={selectedDoctor}
                setSelectedDoctor={setSelectedDoctor}
              />
              {selectedDoctor && (
                <>
                  <DatePicker
                    label="Data da consulta"
                    placeholder={"Selecione uma data"}
                    value={value.date}
                    {...field(model.date)}
                  />
                  {value.date && (
                    <TimeField
                      selectedDate={value.date}
                      selectedDoctor={selectedDoctor}
                      {...field(model.time)}
                    />
                  )}
                </>
              )}
            </>
          )}
        </FormLayout>
      </div>
      <div>
        <h2>Dados pessoais</h2>
        <FormLayout responsiveSteps={responsiveSteps}>
          <TextField label="Nome" {...field(model.name)} />
          <TextField label="E-mail" {...field(model.email)} />
          <TextField label="Telefone" {...field(model.phone)} />
          <Button theme="primary" onClick={submit} {...{ colspan: 2 }}>
            Agendar
          </Button>
        </FormLayout>
      </div>
    </main>
  );
}

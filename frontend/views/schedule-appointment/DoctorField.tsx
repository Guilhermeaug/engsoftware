import { useEffect, useState } from "react";
import { SelectItem } from "Frontend/util/types";
import { EmployeeService } from "Frontend/generated/endpoints";
import { Notification } from "@hilla/react-components/Notification";
import { Select } from "@hilla/react-components/Select";

export default function DoctorField({
  selectedSpeciality,
  selectedDoctor,
  setSelectedDoctor,
}: {
  selectedSpeciality: string;
  selectedDoctor: string;
  setSelectedDoctor: (speciality: string) => void;
}) {
  const [doctors, setDoctors] = useState<SelectItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const doctors = (
        await EmployeeService.findAllDoctorsBySpeciality(selectedSpeciality)
      ).map((doctor) => {
        return {
          label: doctor.name!.toUpperCase(),
          value: doctor.code!.toString(),
        };
      });
      if (doctors.length === 0) {
        return Notification.show("Nenhum médico encontrado", {
          position: "bottom-center",
          theme: "error",
        });
      }
      setDoctors(doctors);
      setSelectedDoctor(doctors[0].value.toString());
      return;
    }

    if (selectedSpeciality) {
      fetchData();
    }

    return () => {
      setDoctors([]);
      setSelectedDoctor("");
    };
  }, [selectedSpeciality]);

  return (
    <Select
      label="Médicos Disponíveis"
      items={doctors}
      placeholder={"Selecione uma especialidade"}
      value={selectedDoctor}
      onChange={(e) => setSelectedDoctor(e.target.value)}
    />
  );
}

import { useEffect, useState } from "react";
import { SelectItem } from "Frontend/util/types";
import { EmployeeService } from "Frontend/generated/endpoints";
import { Notification } from "@hilla/react-components/Notification";
import { Select } from "@hilla/react-components/Select";

export default function SpecialityField({
  selectedSpeciality,
  setSelectedSpeciality,
}: {
  selectedSpeciality: string;
  setSelectedSpeciality: (speciality: string) => void;
}) {
  const [specialities, setSpecialities] = useState<SelectItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const specialities = (await EmployeeService.findAllSpecialities()).map(
        (speciality) => {
          return {
            label: speciality.toUpperCase(),
            value: speciality,
          };
        },
      );
      if (specialities.length === 0) {
        Notification.show("Nenhuma especialidade encontrada", {
          position: "bottom-center",
          theme: "error",
        });
      }
      setSpecialities(specialities);
      setSelectedSpeciality(specialities[0].value);
    }

    fetchData();

    return () => {
      setSpecialities([]);
      setSelectedSpeciality("");
    };
  }, []);

  return (
    <Select
      label="Especialidade"
      items={specialities}
      placeholder={"Selecione uma especialidade"}
      value={selectedSpeciality}
      onChange={(e) => setSelectedSpeciality(e.target.value)}
    />
  );
}
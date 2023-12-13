import { forwardRef, useEffect, useState } from "react";
import { ScheduleService } from "Frontend/generated/endpoints";
import { Notification } from "@hilla/react-components/Notification";
import { Select } from "@hilla/react-components/Select";
import { SelectItem } from "Frontend/util/types";

export default forwardRef(function TimeField(
  {
    selectedDate,
    selectedDoctor,
    ...props
  }: { selectedDate: string; selectedDoctor: string },
  ref,
) {
  const [availableHours, setAvailableHours] = useState<SelectItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const availableHours = (
        await ScheduleService.findAvaliableSchedule(
          parseInt(selectedDoctor),
          selectedDate,
        )
      ).map((hour) => {
        return {
          label: hour.toString(),
          value: hour.toString(),
        };
      });
      if (availableHours.length === 0) {
        return Notification.show("Nenhum horário disponível", {
          position: "bottom-center",
          theme: "error",
        });
      }
      setAvailableHours(availableHours);
      return;
    }

    if (selectedDoctor) {
      fetchData();
    }

    return () => {
      setAvailableHours([]);
    };
  }, [selectedDoctor, selectedDate]);

  return (
    <Select
      label="Horário de Atendimento"
      items={availableHours}
      placeholder={"Selecione um horário"}
      {...props}
      // @ts-ignore
      ref={ref}
    />
  );
});

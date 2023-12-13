import { useEffect, useState } from "react";
import Schedule from "Frontend/generated/com/example/application/model/entity/Schedule";
import { ScheduleService } from "Frontend/generated/endpoints";
import { useAuth } from "Frontend/auth";
import { Grid } from "@hilla/react-components/Grid";
import { GridColumn } from "@hilla/react-components/GridColumn";

export default function ListMySchedulesView() {
  const { state, login, logout } = useAuth();
  const [items, setItems] = useState<Schedule[]>([]);

  useEffect(() => {
    const code = state.user?.code;
    if (code) {
      ScheduleService.findDoctorSchedules(code).then((schedules) =>
        setItems(schedules),
      );
    }
  }, [state.user?.code]);

  return (
    <main className="p-m flex flex-col gap-l">
      <h1>Listagem dos seus agendamentos</h1>
      <Grid items={items}>
        <GridColumn path="name" />
        <GridColumn path="email" />
        <GridColumn path="phone" />
        <GridColumn path="date" />
        <GridColumn path="time" />
      </Grid>
    </main>
  );
}

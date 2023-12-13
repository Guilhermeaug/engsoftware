import { AutoGrid } from "@hilla/react-crud";
import { AddressService, ScheduleService } from "Frontend/generated/endpoints";
import AddressModel from "Frontend/generated/com/example/application/model/entity/AddressModel";
import ScheduleModel from "Frontend/generated/com/example/application/model/entity/ScheduleModel";

export default function ListSchedulesView() {
  return (
    <main className="p-m flex flex-col gap-l">
      <h1>Agendamentos cadastrados</h1>
      <AutoGrid service={ScheduleService} model={ScheduleModel} />
    </main>
  );
}

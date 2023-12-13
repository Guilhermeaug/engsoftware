import { AutoGrid } from "@hilla/react-crud";
import { PatientService } from "Frontend/generated/endpoints";
import PatientModel from "Frontend/generated/com/example/application/model/entity/PatientModel";

export default function ListPatientsView() {
  return (
    <main className="p-m flex flex-col gap-l">
      <h1>Pacientes cadastrados</h1>
      <AutoGrid service={PatientService} model={PatientModel} />
    </main>
  );
}

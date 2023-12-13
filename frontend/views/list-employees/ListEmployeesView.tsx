import { AutoGrid } from "@hilla/react-crud";
import { EmployeeService } from "Frontend/generated/endpoints";
import EmployeeModel from "Frontend/generated/com/example/application/model/entity/EmployeeModel";

export default function ListEmployeesView() {
  return (
    <main className="p-m flex flex-col gap-l">
      <h1>Funcionários cadastrados</h1>
      <AutoGrid
        service={EmployeeService}
        model={EmployeeModel}
        visibleColumns={["name", "email", "phone", "contractDate", "salary"]}
      />
    </main>
  );
}

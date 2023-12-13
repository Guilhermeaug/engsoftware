import { AutoGrid } from "@hilla/react-crud";
import { AddressService } from "Frontend/generated/endpoints";
import AddressModel from "Frontend/generated/com/example/application/model/entity/AddressModel";

export default function ListAddressesView() {
  return (
    <main className="p-m flex flex-col gap-l">
      <h1>Endereços cadastrados</h1>
      <AutoGrid service={AddressService} model={AddressModel} />
    </main>
  );
}

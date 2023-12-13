import { Button } from "@hilla/react-components/Button.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Notification } from "@hilla/react-components/Notification.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { AddressService } from "Frontend/generated/endpoints";
import { useForm, useFormPart } from "@hilla/react-form";
import { useEffect } from "react";
import { Select } from "@hilla/react-components/Select.js";
import { states } from "./data";
import AddressModel from "Frontend/generated/com/example/application/model/entity/AddressModel";

const responsiveSteps = [
  { minWidth: "0", columns: 1 },
  { minWidth: "500px", columns: 2 },
];

export default function NewAddressView() {
  const { model, field, submit, clear, value } = useForm(AddressModel, {
    onSubmit: async (address) => {
      try {
        address.zipCode = address.zipCode?.replace(/-/g, "");

        const savedAddress = await AddressService.save(address);
        if (savedAddress) {
          Notification.show("Endereço cadastrado com sucesso", {
            position: "bottom-center",
            theme: "success",
          });
          clear();
        }
      } catch (e) {
        Notification.show("Erro ao cadastrar endereço", {
          position: "bottom-center",
          theme: "error",
        });
        console.error(e);
      }
    },
  });

  const zipCodeField = useFormPart(model.zipCode);
  useEffect(() => {
    zipCodeField.addValidator({
      message: "CEP fora do formato padrão",
      validate: (value) => {
        let regex = /^\d{5}-\d{3}$/;
        let isValid = regex.test(value);
        if (!isValid) {
          return [{ property: model.zipCode }];
        }
        return [];
      },
    });
  }, []);

  value.zipCode = value.zipCode?.replace(/(\d{5})(\d{3})/, "$1-$2");

  return (
    <main className="p-m flex flex-col gap-m">
      <h1>Cadastro de novo endereço na base de dados</h1>
      <FormLayout responsiveSteps={responsiveSteps}>
        <TextField label="CEP" {...field(model.zipCode)} />
        <TextField label="Logradouro" {...field(model.street)} />
        <TextField
          {...{ colspan: 2 }}
          label="Bairro"
          {...field(model.neighborhood)}
        />
        <TextField label="Cidade" {...field(model.city)} />
        <Select
          items={states}
          placeholder="Selecione um estado"
          {...field(model.state)}
        />
        <Button {...{ colspan: 2 }} className="mt-s" onClick={submit}>
          Salvar
        </Button>
      </FormLayout>
    </main>
  );
}

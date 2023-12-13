import { Button } from "@hilla/react-components/Button.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Notification } from "@hilla/react-components/Notification.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { AddressService, PatientService } from "Frontend/generated/endpoints";
import { useForm, useFormPart } from "@hilla/react-form";
import { useEffect } from "react";
import PatientModel from "Frontend/generated/com/example/application/model/entity/PatientModel";
import { responsiveSteps } from "Frontend/util/types";
import { NumberField } from "@hilla/react-components/NumberField";

export default function RegisterPatientView() {
  const { model, field, submit, clear, value, setValue } = useForm(
    PatientModel,
    {
      onSubmit: async (patient) => {
        try {
          patient.zipcode = patient.zipcode?.replace(/-/g, "");
          const savedPatient = await PatientService.save(value);
          if (savedPatient) {
            Notification.show("Paciente cadastrado com sucesso", {
              position: "bottom-center",
              theme: "success",
            });
          }
          clear();
        } catch (e) {
          Notification.show("Erro ao cadastrar paciente", {
            position: "bottom-center",
            theme: "error",
          });
          console.error(e);
        }
      },
    },
  );

  const zipCodeField = useFormPart(model.zipcode);
  useEffect(() => {
    zipCodeField.addValidator({
      message: "CEP fora do formato padrão",
      validate: (value) => {
        let regex = /^\d{5}-\d{3}$/;
        let isValid = regex.test(value);
        if (!isValid) {
          return [{ property: model.zipcode }];
        }
        return [];
      },
    });
  }, []);

  useEffect(() => {
    async function fetchAddress() {
      const unformattedZipCode = value.zipcode?.replace(/-/g, "");
      const address = await AddressService.findOneByZipCode(
        unformattedZipCode!,
      );
      if (address) {
        value.street = address.street;
        value.city = address.city;
        value.state = address.state;
        value.neighborhood = address.neighborhood;
      }
    }

    if (value.zipcode) {
      fetchAddress();
    }
  }, [value.zipcode]);

  value.zipcode = value.zipcode?.replace(/(\d{5})(\d{3})/, "$1-$2");

  return (
    <main className="p-m">
      <form className="flex flex-col gap-l">
        <div>
          <h2>Informações pessoais</h2>
          <FormLayout responsiveSteps={responsiveSteps}>
            <TextField label="Nome" {...field(model.name)} />
            <TextField label="Email" {...field(model.email)} />
            <TextField label="Telefone" {...field(model.phone)} />
            <NumberField label="Peso" {...field(model.weight)}>
              <div slot="suffix">KG</div>
            </NumberField>
            <NumberField label="Altura" {...field(model.height)}>
              <div slot="suffix">CM</div>
            </NumberField>
            <TextField label="Tipo Sanguíneo" {...field(model.bloodType)} />
          </FormLayout>
        </div>
        <div>
          <h2>Endereço</h2>
          <FormLayout responsiveSteps={responsiveSteps}>
            <TextField label="CEP" {...field(model.zipcode)} />
            <TextField label="Logradouro" {...field(model.street)} />
            <TextField label="Bairro" {...field(model.neighborhood)} />
            <TextField label="Cidade" {...field(model.city)} />
            <TextField label="Estado" {...field(model.state)} />
          </FormLayout>
        </div>
        <Button theme="primary" onClick={submit}>
          Cadastrar
        </Button>
      </form>
    </main>
  );
}

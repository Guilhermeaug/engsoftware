import { useForm } from "@hilla/react-form";
import { Notification } from "@hilla/react-components/Notification";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { TextArea } from "@hilla/react-components/TextArea";
import { responsiveSteps } from "Frontend/util/types";
import { Button } from "@hilla/react-components/Button.js";

import { useEffect, useState } from "react";
import { ComboBox } from "@hilla/react-components/ComboBox";
import {
  EletronicRecordService,
  PatientService,
} from "Frontend/generated/endpoints";
import Patient from "Frontend/generated/com/example/application/model/entity/Patient";
import ElectronicMedicalRecordModel from "Frontend/generated/com/example/application/model/entity/ElectronicMedicalRecordModel";

export default function RegisterMedicalRecordView() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const { model, field, submit, clear, value } = useForm(
    ElectronicMedicalRecordModel,
    {
      onSubmit: async (record) => {
        try {
          if (!record.certificates) record.certificates = "";
          if (!record.exams) record.exams = "";

          const patientCode = patients.find((p) => p.name === selectedPatient)
            ?.code;
          if (!patientCode) return;
          await EletronicRecordService.save(record, patientCode);

          Notification.show("Cadastrado com sucesso", {
            position: "bottom-center",
            theme: "success",
          });
          clear();
        } catch (e) {
          Notification.show("Erro ao cadastrar avaliação", {
            position: "bottom-center",
            theme: "error",
          });
        }
      },
    },
  );

  useEffect(() => {
    async function fetchPatients() {
      const patients = await PatientService.findAll();
      setPatients(patients);
    }

    fetchPatients();
  }, []);

  return (
    <main className="p-m flex flex-col gap-m">
      <h1>Dados da avaliação</h1>
      <FormLayout responsiveSteps={responsiveSteps}>
        <ComboBox
          label="Paciente referente a avaliação"
          helperText="Escolha um nome da lista"
          items={patients.map((patient) => patient.name)}
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
        />
        <TextArea
          label="Anamnese"
          style={{ width: "100%" }}
          {...field(model.anamnesis)}
          {...{ colspan: 2 }}
        />
        <TextArea
          label="Prescrição de medicamentos"
          style={{ width: "100%" }}
          {...field(model.medicines)}
          {...{ colspan: 2 }}
        />
        <TextArea
          label="Emitir atestado médico"
          style={{ width: "100%" }}
          {...field(model.certificates)}
          {...{ colspan: 2 }}
        />
        <TextArea
          label="Solicitar exames"
          style={{ width: "100%" }}
          {...field(model.exams)}
          {...{ colspan: 2 }}
        />
        <Button {...{ colspan: 2 }} theme="primary" onClick={submit}>
          Enviar avaliação
        </Button>
      </FormLayout>
    </main>
  );
}

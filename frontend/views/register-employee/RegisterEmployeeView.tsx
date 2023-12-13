import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { NumberField } from '@hilla/react-components/NumberField';
import { PasswordField } from '@hilla/react-components/PasswordField';
import { Select } from '@hilla/react-components/Select.js';
import { Button } from '@hilla/react-components/Button.js';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeTypes, specialities } from './data';
import { Notification } from '@hilla/react-components/Notification.js';
import { useEffect } from 'react';
import { AddressService, EmployeeService } from 'Frontend/generated/endpoints';

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '0', columns: 2 },
];

const baseSchema = z.object({
  name: z.string().min(1, 'É preciso informar o nome do funcionário'),
  email: z.string().email().min(1, 'É preciso informar o email do funcionário'),
  phone: z
    .string()
    .min(1, 'É preciso informaro número de telefone')
    .regex(
      /^(\d{2})\D*(\d{5}|\d{4})\D*(\d{4})$/,
      'O número de telefone precisa estar no formato 00123456789'
    ),
  contractDate: z.string().min(1, 'É preciso informar a data de contrato'),
  salary: z.coerce
    .number()
    .positive('O salário precisa ser positivo')
    .min(1, 'É preciso informar o salário do funcionário'),
  hashPassword: z.string().min(1, 'É preciso informar a senha do funcionário'),
  zipcode: z.string().min(1, 'É preciso informar o CEP do funcionário'),
  street: z.string().min(1, 'É preciso informar a rua do funcionário'),
  neighborhood: z.string().min(1, 'É preciso informar o bairro do funcionário'),
  city: z
    .string()
    .min(1, 'É preciso informar a cidade de residência do funcionário'),
  state: z
    .string()
    .min(1, 'É preciso informar o estado de residência do funcionário'),
});

const schema = z.discriminatedUnion('type', [
  baseSchema.merge(
    z.object({
      type: z.literal('admin'),
    })
  ),
  baseSchema.merge(
    z.object({
      type: z.literal('doctor'),
      speciality: z.string().min(1, 'É preciso informar a especialidade'),
      crm: z.string().min(1, 'É preciso informar o CRM'),
    })
  ),
]);

type Employee = z.infer<typeof schema>;

export default function RegisterEmployeeView() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<Employee>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'admin',
    },
    shouldUnregister: true,
  });

  const employeeType = watch('type');
  const zipCode = watch('zipcode');

  useEffect(() => {
    async function fetchAddress() {
      let address = await AddressService.findOneByZipCode(zipCode);
      if (address) {
        setValue('street', address?.zipCode!);
        setValue('neighborhood', address?.neighborhood!);
        setValue('city', address?.city!);
        setValue('state', address?.state!);
      }
    }
    fetchAddress();
  }, [zipCode]);

  async function onSubmit(data: Employee) {
    try {
      if (data.type === 'admin') {
        await EmployeeService.save(data);
        reset();
      } else if (data.type === 'doctor') {
        await EmployeeService.saveDoctor(data);
        reset();
      }
      Notification.show('Funcionário cadastrado com sucesso', {
        position: 'bottom-center',
        theme: 'success',
      });
    } catch (e) {
      Notification.show('Erro ao cadastrar funcionário', {
        position: 'bottom-center',
        theme: 'error',
      });
    }
  }

  return (
    <main className="p-m">
      <form className="flex flex-col gap-l">
        <div>
          <h2>Informações pessoais</h2>
          <FormLayout responsiveSteps={responsiveSteps}>
            <TextField
              label="Nome"
              {...register('name')}
              errorMessage={errors.name?.message}
              invalid={!!errors.name}
            />
            <TextField
              label="Email"
              {...register('email')}
              errorMessage={errors.email?.message}
              invalid={!!errors.email}
            />
            <TextField
              label="Telefone"
              {...register('phone')}
              errorMessage={errors.phone?.message}
              invalid={!!errors.phone}
            />
            <Controller
              name="contractDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Data de contrato"
                  defaultValue={new Date().toLocaleDateString()}
                  placeholder={new Date().toLocaleDateString()}
                  invalid={!!errors.contractDate}
                  errorMessage={errors.contractDate?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="salary"
              control={control}
              render={({ field }) => (
                // @ts-ignore
                <NumberField
                  label="Salário"
                  invalid={!!errors.salary}
                  errorMessage={errors.salary?.message}
                  {...field}
                >
                  <div slot="prefix">R$</div>
                </NumberField>
              )}
            />
            <PasswordField
              label="Senha"
              {...register('hashPassword')}
              errorMessage={errors.hashPassword?.message}
              invalid={!!errors.hashPassword}
            />{' '}
          </FormLayout>
        </div>

        <div>
          <h2>Endereço</h2>
          <FormLayout responsiveSteps={responsiveSteps}>
            <TextField
              label="CEP"
              {...register('zipcode')}
              errorMessage={errors.zipcode?.message}
              invalid={!!errors.zipcode}
            />
            <TextField
              label="Logradouro"
              {...register('street')}
              errorMessage={errors.street?.message}
              invalid={!!errors.street}
            />
            <TextField
              label="Bairro"
              {...register('neighborhood')}
              errorMessage={errors.neighborhood?.message}
              invalid={!!errors.neighborhood}
            />
            <TextField
              label="Cidade"
              {...register('city')}
              errorMessage={errors.city?.message}
              invalid={!!errors.city}
            />
            <TextField
              label="Estado"
              {...register('state')}
              errorMessage={errors.state?.message}
              invalid={!!errors.state}
            />
          </FormLayout>
        </div>

        <div>
          <h2>Tipo de Funcionário</h2>
          <FormLayout responsiveSteps={responsiveSteps}>
            <Select
              items={employeeTypes}
              placeholder="Escolhe um tipo de funcionário"
              {...{ colspan: 2 }}
              {...register('type')}
              errorMessage={errors.type?.message}
              invalid={!!errors.type}
            />
            {employeeType === 'doctor' && (
              <>
                <Select
                  label="Especialidade"
                  items={specialities}
                  defaultValue={specialities[0].value}
                  placeholder={specialities[0].label}
                  {...register('speciality')}
                  // @ts-ignore
                  errorMessage={errors.speciality?.message}
                  // @ts-ignore
                  invalid={!!errors.speciality}
                />
                <TextField
                  label="CRM"
                  {...register('crm')}
                  // @ts-ignore
                  errorMessage={errors.crm?.message}
                  // @ts-ignore
                  invalid={!!errors.crm}
                />
              </>
            )}
          </FormLayout>
        </div>

        <Button theme="primary" onClick={handleSubmit(onSubmit)}>
          Cadastrar
        </Button>
      </form>
    </main>
  );
}

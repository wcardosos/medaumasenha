import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

interface IFormValues {
  type: string
  quantity: number | null
}
interface IFormProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (type: string, quantity: number | null) => void
}

const passwordGeneratorSchema = Yup.object().shape({
  type: Yup.string().required('É necessário escolher um tipo de senha!'),
  quantity: Yup
    .number()
    .nullable()
    .when('type', {
      is: 'alpha',
      then: Yup
        .number()
        .nullable()
        .min(6, 'Valor mínimo: 6 caracteres')
        .max(36, 'Valor máximo: 36 caracteres'),
    })
    .when('type', {
      is: 'numeric',
      then: Yup
        .number()
        .nullable()
        .min(6, 'Valor mínimo: 6 caracteres')
        .max(16, 'Valor máximo: 16 caracteres'),
    })
    .optional(),
});

export default function Form({ onSubmit }: IFormProps) {
  const helperTexts = {
    alpha: 'Valor padrão: 36 caracteres',
    numeric: 'Valor padrão: 16 caracteres',
  };

  return (
    <Box as="form">
      <Formik
        initialValues={{
          type: '',
          quantity: null,
        }}
        onSubmit={(values: IFormValues) => {
          onSubmit(values.type, values.quantity);
        }}
        validationSchema={passwordGeneratorSchema}
      >
        {({
          errors,
          touched,
          values,
          submitForm,
        }) => (
          <VStack spacing="8">
            <Stack direction={['column', 'row']} spacing="4">
              <Field name="type" touched={touched.type}>
                {({ field }) => (
                  <FormControl isInvalid={Boolean(errors.type)}>
                    <FormLabel htmlFor="type">Tipo de senha:</FormLabel>
                    <Select
                      id="type"
                      placeholder="Selecione o tipo de senha"
                      {...field}
                    >
                      <option value="alpha">Alfanumérica</option>
                      <option value="numeric">Numérica</option>
                    </Select>
                    { errors.type
                      ? <FormErrorMessage>{errors.type}</FormErrorMessage>
                      : null}
                  </FormControl>
                )}
              </Field>
              <Field name="quantity" touched={touched.quantity}>
                {({ field }) => (
                  <FormControl isInvalid={Boolean(errors.quantity)}>
                    <FormLabel htmlFor="quantity">Quantidade de caracteres:</FormLabel>
                    <NumberInput>
                      <NumberInputField id="quantity" placeholder="Digite a quantidade" {...field} />
                    </NumberInput>
                    { errors.quantity
                      ? <FormErrorMessage>{errors.quantity}</FormErrorMessage>
                      : (
                        <FormHelperText
                          fontSize={[10, 12]}
                        >
                          {values.type && helperTexts[values.type]}
                        </FormHelperText>

                      )}
                  </FormControl>
                )}
              </Field>
            </Stack>
            <Button
              data-testid="generate-button"
              bgColor="blue.600"
              color="gray.50"
              onClick={submitForm}
              _active={{
                transform: 'scale(0.98)',
              }}
              _hover={{
                bgColor: 'blue.500',
              }}
            >
              Gerar
            </Button>
          </VStack>
        )}
      </Formik>
    </Box>
  );
}

import * as Yup from "yup";

export const schemaFormAddress = Yup.object().shape({
  number: Yup.string().required("Insira o número"),
  notComplement: Yup.string(),
  complement: Yup.string().when("notComplement", {
    is: (value: string) => value.includes("false"),
    then: Yup.string().required("Informe o complemento"),
  }),
});

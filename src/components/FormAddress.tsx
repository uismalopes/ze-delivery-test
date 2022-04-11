import { useTypedSelector } from "@hooks/useTypeSelector";
import { FormikHelpers, useFormik } from "formik";
import React, { useCallback, useState } from "react";
import { CircularProgress } from "react-cssfx-loading/lib";
import { BsCheckLg } from "react-icons/bs";
import { schemaFormAddress } from "src/schema/schemaFormAddress";
import { IFormAddress } from "src/types/IFormAddress";

import Input from "./Input";

interface IProps {
  onSubmitForm: (
    values: IFormAddress,
    formikHelpers: FormikHelpers<IFormAddress>
  ) => void;
}

function FormAddress(props: IProps) {
  const { onSubmitForm } = props;
  const [checked, setChecked] = useState(false);
  const { address } = useTypedSelector((states) => states.zeStates);

  const formik = useFormik({
    initialValues: {
      number: address?.address || "",
      complement: "",
      notComplement: "false",
    } as IFormAddress,
    validationSchema: schemaFormAddress,
    onSubmit: onSubmitForm,
    enableReinitialize: true,
  });

  const numberOnly = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/\D/.test(value)) {
      e.target.value = value.replace(/\D/g, "");
      return false;
    }
    return true;
  }, []);

  return (
    <form
      autoComplete="off"
      className="form-address"
      onSubmit={formik.handleSubmit}
    >
      <div className="grid-form">
        <div className="form-group">
          <Input
            type="text"
            name="number"
            placeholder="Número"
            isInvalid={!!(formik.errors.number && formik.touched.number)}
            onChange={(e) => {
              numberOnly(e);
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.number}
            required
          />
          {formik.errors.number && formik.touched.number && (
            <small className="text-danger">{formik.errors.number}</small>
          )}
        </div>
        <div className="form-group">
          <Input
            type="text"
            name="complement"
            placeholder="Complemento"
            isInvalid={
              !!(formik.errors.complement && formik.touched.complement)
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.complement}
          />
          {formik.errors.complement && formik.touched.complement && (
            <small className="text-danger">{formik.errors.complement}</small>
          )}
          <div className="input-checkbox mt-1">
            <input
              type="checkbox"
              name="notComplement"
              id="not-complement"
              className="d-none"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setChecked(!checked);
                formik.handleChange(e);
              }}
              value={`${formik.values.notComplement}`}
            />
            <label
              className="checkbox-animation text-white d-flex align-items-center"
              htmlFor="not-complement"
            >
              <span>{checked && <BsCheckLg />}</span>
              Não tenho complemento
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn p-2 text-uppercase mt-2"
        disabled={!(formik.isValid && formik.dirty)}
      >
        {formik.isSubmitting ? (
          <span className="d-flex align-items-center justify-content-center">
            <CircularProgress color="#fff" width="30px" />
            <span className="ml-1">Procurando produtos</span>
          </span>
        ) : (
          <span>Ver produtos disponíveis</span>
        )}
      </button>
    </form>
  );
}

export default FormAddress;

"use client";
import { axiosClient } from "@/utils/AxiosClient";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

function RegisterPage() {
  const onSubmitHandler = async (values, helpers) => {
    try {
      const response = await axiosClient.post("/auth/register", values);
      const data = await response.data;
      toast.success(data?.msg);
      helpers.resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.msg || error?.message);
    }
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    ac_type: ""
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is Required"),
    email: yup
      .string()
      .required("Email is Required")
      .email("Email must be valid"),
    password: yup.string().required("Password is Required"),
    ac_type: yup
      .string()
      .oneOf(
        ["saving", "current"],
        "Account Should a valid Saving or Current Account"
      )
      .required("Account Type is Required")
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        <Form className="w-1/2 px-10 py-10 border rounded-md">
          <p className="text-center pb-8 font-bold text-2xl underline">
            Register
          </p>
          <div className="mb-3">
            <Field
              placeholder="Name"
              type="text"
              name="name"
              className="input w-full py-3 px-3 rounded border outline-none"
            />
            <ErrorMessage
              name="name"
              className="text-red-500"
              component={"p"}
            />
          </div>
          <div className="mb-3">
            <Field
              placeholder="Email"
              type="text"
              name="email"
              className="input w-full py-3 px-3 rounded border outline-none"
            />
            <ErrorMessage
              name="email"
              className="text-red-500"
              component={"p"}
            />
          </div>
          <div className="mb-3">
            <Field
              placeholder="Password"
              type="text"
              name="password"
              className="input w-full py-3 px-3 rounded border outline-none"
            />
            <ErrorMessage
              name="password"
              className="text-red-500"
              component={"p"}
            />
          </div>
          <div className="mb-3">
            <Field
              as="select"
              placeholder="Account Type"
              name="ac_type"
              className="w-full py-3 px-3 rounded border outline-none"
              id=""
            >
              <option value="">Select Account Type</option>
              <option value="saving">Saving</option>
              <option value="current">Current</option>
            </Field>
            <ErrorMessage
              name="ac_type"
              className="text-red-500"
              component={"p"}
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 text-center text-lg bg-rose-500 text-white mt-5 rounded-md"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegisterPage;

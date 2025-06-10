"use client";
import { axiosClient } from "@/utils/AxiosClient";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

function RegisterPage() {
  const onSubmitHandler = async (values, helpers) => {
    console.log(values);
    try {
      const response = await axiosClient.post("/auth/login", values);
      const data = await response.data;
      helpers.resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.msg || error?.message);
    }
  };

  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is Required")
      .email("Email must be valid"),
    password: yup.string().required("Password is Required")
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        <Form className="w-1/2 px-10 py-10 border rounded-md">
          <p className="text-center pb-8 font-bold text-2xl underline">Login</p>
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
          <button
            type="submit"
            className="w-full py-4 text-center text-lg bg-rose-500 text-white mt-5 rounded-md"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegisterPage;

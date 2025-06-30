"use client";
import { axiosClient } from "@/utils/AxiosClient";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import CustomAuthButton from "@/components/reuseable/CustomAuthButton";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMainContext } from "@/context/MainContext";

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { fetchUserProfile } = useMainContext();

  const onSubmitHandler = async (values, helpers) => {
    setLoading(true);
    try {
      const response = await axiosClient.post("/auth/register", values);
      const data = await response.data;
      toast.success(data?.msg);
      localStorage.setItem("token", data?.token);
      fetchUserProfile();
      helpers.resetForm();
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.msg || error?.message);
    } finally {
      setLoading(false);
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
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="w-full xl:w-[60%] py-10 flex items-start border rounded-md shadow-lg shadow-red-100">
        <div className="hidden lg:block rounded lg:ml-15">
          <img
            src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/94/aa/f5/94aaf5ca-9d5d-57b5-af92-f1cfd3386dd8/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/512x512bb.jpg"
            alt=""
            className="hidden lg:block rounded-md"
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          <Form className="w-full lg:w-1/2 px-10 py-10 border rounded-md lg:mx-10 lg:mt-5">
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
                placeholder="Email address"
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
            <div className="mb-3">
              <CustomAuthButton
                isLoading={loading}
                text={"Register"}
                type="submit"
              />
            </div>
            <div className="mb-3">
              <p className="text-end font-medium">
                Already have an account ?{" "}
                <Link href={"/login"} className="text-red-600">
                  Login
                </Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default RegisterPage;

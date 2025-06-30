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

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { user, fetchUserProfile } = useMainContext();
  const router = useRouter();

  const onSubmitHandler = async (values, helpers) => {
    try {
      setLoading(true);
      const response = await axiosClient.post("/auth/login", values);
      const data = await response.data;
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
          <Form className="w-full lg:w-1/2 px-10 py-10 border rounded-md lg:mx-10 lg:mt-20">
            <p className="text-center pb-8 font-bold text-2xl underline">
              Login
            </p>
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
              <CustomAuthButton
                isLoading={loading}
                text={"Login"}
                type="submit"
              />
            </div>
            <div className="mb-3">
              <p className="text-end font-medium">
                Don't have an account ?{" "}
                <Link href={"/register"} className="text-red-600">
                  Register
                </Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;

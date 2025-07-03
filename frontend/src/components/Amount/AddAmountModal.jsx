"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa6";
import { SiRazorpay } from "react-icons/si";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

export default function AddAmountModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const initial_state = {
    amount: 0
  };

  const validationSchema = yup.object({
    amount: yup
      .number()
      .min(1, "Enter minimum amount 1 Pkr")
      .required("Amount is required")
  });

  const onSubmitHandler = (values, { resetForm }) => {
    try {
      setLoading(true);
      console.log(values);
      toast.success("Amount added successfully");
      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.msg || error?.message);
    } finally {
      setLoading(false);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal}>
        <CiSquarePlus className="text-3xl text-rose-700 cursor-pointer" />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-[50vh] items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                  >
                    <span>Add Payment</span>
                    <button
                      onClick={closeModal}
                      className="text-2xl text-black p-2 bg-rose-100 rounded-full cursor-pointer"
                    >
                      <IoClose />
                    </button>
                  </Dialog.Title>
                  <Formik
                    validationSchema={validationSchema}
                    initialValues={initial_state}
                    onSubmit={onSubmitHandler}
                  >
                    {({ values, handleSubmit }) => (
                      <form
                        onSubmit={handleSubmit}
                        className="w-[96%] lg:w-[80%] mx-auto"
                      >
                        <div className="mb-3 flex items-center gap-x-2 px-2 border w-full rounded mt-3">
                          <FaRupeeSign className="text-2xl" />{" "}
                          <Field
                            name="amount"
                            type="text"
                            className="w-full py-2 outline-none border-none "
                            placeholder="Enter Amount (in pkr)"
                            onInput={(e) =>
                              (e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              ))
                            }
                          />
                        </div>
                        <div className="mb-3 flex w-full justify-end ">
                          <button
                            disabled={values?.amount < 1 || loading}
                            className="px-3 flex items-center gap-x-2 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white rounded"
                            loading={loading}
                          >
                            <span>Pay</span>
                            <SiRazorpay />
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

import Navbar from "@/components/Navbar";
import React from "react";
import { ToastContainer } from "react-toastify";

function Mainlayout({ children }) {
  return (
    <>
      <ToastContainer />
      <Navbar />
      {children}
    </>
  );
}

export default Mainlayout;

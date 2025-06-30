"use client";
import Navbar from "@/components/Navbar";
import { MainContextProvider } from "@/context/MainContext";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

function Mainlayout({ children }) {
  return (
    <Provider store={store}>
      <MainContextProvider>
        <ToastContainer />
        <Navbar />
        {children}
      </MainContextProvider>
    </Provider>
  );
}

export default Mainlayout;

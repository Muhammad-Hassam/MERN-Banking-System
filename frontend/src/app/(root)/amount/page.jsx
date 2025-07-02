import AddAmountModal from "@/components/Amount/AddAmountModal";
import HeaderName from "@/components/reuseable/HeaderName";
import React from "react";

function AmountPage() {
  return (
    <div className="container py-10">
      <HeaderName />
      <div className="card w-1/3 border py-5 rounded flex items-center justify-between px-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Add Amount</h1>
          <p>Total Amount: 150/-</p>
        </div>

        <AddAmountModal />
      </div>
    </div>
  );
}

export default AmountPage;

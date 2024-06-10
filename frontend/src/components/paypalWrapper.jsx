import React, { useState } from "react";
import Paypal from "./paypal";
import { OrderLabel } from "./templates";

const PaypalWrapper = ({ amount, userData, token, navigate, formattedSubtotal }) => {
  const [checkout, setCheckOut] = useState(false);

  return (
    <>
      {checkout ? (
        <Paypal amount={amount} userData={userData} token={token} navigate={navigate} />
      ) : (
        <button onClick={() => setCheckOut(true)} className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-4">Pay with PayPal</button>
      )}
      <OrderLabel>
        Suma:
        <label className="flex w-32 md:w-48 lg:w-64 items-center text-center justify-center rounded-lg border">
          {formattedSubtotal}
        </label>
      </OrderLabel>
    </>
  );
};

export default PaypalWrapper;

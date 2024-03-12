import React from "react";
import { useNavigate } from "react-router-dom";

function Pending() {
  let navigate = useNavigate();

  return (
    <div className="lg:ps-28 text-gray-300">
      <div className="flex flex-col gap-8 my-52 justify-center items-center">
        <h2 className="text-2xl font-bold text-center">
          Tu pago figura como pendiente
        </h2>
        <p className="text-xl">
          Una vez recibamos la confirmación recibirás un email con la
          información sobre tu compra
        </p>
        <button
          onClick={() => navigate("/NXBOStore")}
          className="bg-orange-500 text-zinc-900 font-semibold p-3 rounded-xl"
        >
          Back to store
        </button>
      </div>
    </div>
  );
}

export default Pending;

import React from "react";
import { useNavigate } from "react-router-dom";

function Declined() {
  let navigate = useNavigate();

  return (
    <div className="lg:ps-28 text-gray-300">
      <div className="flex flex-col gap-8 my-52 justify-center items-center">
        <h2 className="text-2xl font-bold text-center">
          Oops! Parece que hubo un problema con el pago
        </h2>
        <p className="text-xl">
          Prueba con otro metodo de pago o comunicate con nosotros
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

export default Declined;

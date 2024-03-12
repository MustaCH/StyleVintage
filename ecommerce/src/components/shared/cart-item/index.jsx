import React, { useContext } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CartContext } from "../../../storage/cart-context";

function CartItem({ product }) {
  const { deleteProduct } = useContext(CartContext);

  const { title, price, pic1, discount, quantity, size, id } = product;

  let finalPrice = price;

  if (discount > 0) {
    finalPrice = price - discount;
  }

  let totalPrice = finalPrice * quantity;

  const handleDelete = () => {
    deleteProduct(id);
  };

  return (
    <div className="flex justify-between text-black bg-zinc-50 p-4 mb-4 rounded-xl w-96 md:w-4/5 drop-shadow-lg">
      <div className="flex items-center">
        <Link to={`/cat/:catid/${id}`}>
          <img
            className="w-12 h-12 lg:w-20 lg:h-20 rounded-full"
            src={pic1}
            alt={title}
          />
        </Link>
        <div className="ps-4">
          <p className="text-xs lg:text-base">{title}</p>
          <p className="text-sm lg:text-base">U$D {finalPrice}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <p className="bg-zinc-700  rounded-full p-2 text-sm text-white">
            {quantity}
          </p>
          <p className="text-xs lg:text-base">
            {size === "" ? "One size" : `Size: ${size.toUpperCase()}`}
          </p>
          <p className="text-sm lg:text-base">U$D {totalPrice}</p>
          <button>
            <RiDeleteBin5Line
              onClick={handleDelete}
              className="text-red-500 md:w-6 md:h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

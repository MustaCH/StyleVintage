import React, { useContext } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import CartItem from "../../components/shared/cart-item";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../storage/cart-context";

function Cart() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalDiscount = cart.reduce((total, product) => {
    return total + product.discount;
  }, 0);

  const totalPrice = cart.reduce((total, product) => {
    const productPrice = (product.price - product.discount) * product.quantity;
    return total + productPrice;
  }, 0);

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="lg:pl-28 lg:flex lg:justify-center fixed lg:static  w-full h-full z-50">
      <div className=" lg:w-6/12 lg:mt-12 rounded-xl">
        <Link
          onClick={() => navigate(-1)}
          className="relative flex justify-end"
        >
          <RiArrowLeftSLine className="lg:hidden absolute left-4 top-4 p-2 box-content text-gray-300 bg-zinc-800 rounded-full text-xl" />
          <h1 className="text-black font-bold text-3xl p-4">Cart</h1>
        </Link>

        {cart.length === 0 ? (
          <p className="text-center text-xl text-black/50 py-24">
            Cart is empty
          </p>
        ) : (
          <div className=" flex flex-col items-center py-6 h-[550px] overflow-y-auto overflow-x-hidden cart-scroll">
            {cart.map((cartItem) => (
              <CartItem key={cartItem.id} product={cartItem} />
            ))}
          </div>
        )}
        <div className="fixed bottom-0 w-full lg:relative bg-zinc-300/50 backdrop-blur-lg rounded-tr-2xl rounded-tl-2xl  lg:rounded-bl-xl lg:rounded-br-xl">
          <div className="p-4 flex flex-col lg:h-28">
            <div
              className={`${
                cart.length === 0
                  ? `hidden`
                  : `flex justify-between text-black/70 py-1`
              }`}
            >
              <p
                className={`${
                  totalDiscount !== 0 ? `text-red-500` : `text-black/50`
                }`}
              >
                Discount applied
              </p>
              <p
                className={`${
                  totalDiscount !== 0 ? `text-red-500` : `text-black/50`
                }`}
              >
                -${totalDiscount}
              </p>
            </div>
            <div className="flex justify-between text-black py-1">
              <p className="font-bold text-2xl">Total</p>
              <p className="font-bold text-2xl">U$D {totalPrice}</p>
            </div>
            <div className="flex flex-col justify-evenly gap-2 pt-6 lg:pt-12">
              {cart.length !== 0 && (
                <button
                  onClick={
                    cart.length === 0 ? null : () => navigate("/checkout")
                  }
                  className={`${
                    cart.length === 0
                      ? `bg-gray-500 text-zinc-800 font-semibold p-3 lg:mt-8 rounded-xl cursor-not-allowed`
                      : `bg-zinc-50 text-zinc-900 font-semibold p-3 rounded-xl`
                  }`}
                >
                  Checkout
                </button>
              )}

              <button
                onClick={cart.length === 0 ? null : handleClearCart}
                className={`${
                  cart.length === 0
                    ? `hidden`
                    : `bg-zinc-900  text-red-500 font-semibold p-3 rounded-xl`
                }`}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

import React, { useContext, useEffect, useState } from "react";
import { RiHome6Line, RiChat1Line, RiShoppingCart2Line } from "react-icons/ri";
import { TbHanger } from "react-icons/tb";
import { NavLink, useLocation } from "react-router-dom";
import { CartContext } from "../../../storage/cart-context";

function NavMobile() {
  const { cart } = useContext(CartContext);
  const [activePage, setActivePage] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  return (
    <div className="relative z-50">
      <nav className="bg-zinc-50 lg:hidden fixed w-full bottom-[-1%] left-0 text-3xl  p-4 px-10 flex justify-between rounded-tr-xl rounded-tl-xl drop-shadow-2xl">
        <NavLink to={"/"}>
          <button
            className={activePage === "/" ? `text-black` : `text-gray-400`}
          >
            <RiHome6Line />
          </button>
        </NavLink>
        <NavLink to={"/chat"}>
          <button
            className={activePage === "/chat" ? `text-black` : `text-gray-400`}
          >
            <RiChat1Line />
          </button>
        </NavLink>
        <NavLink to={"/product-list"}>
          <div
            className={
              activePage === "/product-list" ? `text-black` : `text-gray-400`
            }
          >
            <TbHanger />
          </div>
        </NavLink>
        <NavLink to={"/cart"}>
          <button
            className={activePage === "/cart" ? `text-black` : `text-gray-400`}
          >
            <RiShoppingCart2Line />
            <span
              className={`${
                cart.length === 0
                  ? `absolute opacity-0`
                  : `absolute opacity-100 transition-opacity duration-500 text-gray-400 font-semibold text-center rounded-full  top-5 right-7 text-lg`
              }`}
            >
              {cart.length}
            </span>
          </button>
        </NavLink>
      </nav>
    </div>
  );
}

export default NavMobile;

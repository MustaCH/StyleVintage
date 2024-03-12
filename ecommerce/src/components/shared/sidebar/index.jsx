import React, { useContext, useEffect, useState } from "react";
import {
  RiHome6Line,
  RiChat1Line,
  RiShoppingCart2Line,
  RiQuestionnaireLine,
} from "react-icons/ri";
import { TbHanger } from "react-icons/tb";
import { NavLink, useLocation } from "react-router-dom";
import { CartContext } from "../../../storage/cart-context";

const Sidebar = () => {
  const { cart } = useContext(CartContext);
  const [activePage, setActivePage] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  return (
    <nav className="hidden bg-zinc-50 fixed z-50 left-0 top-0 w-28 h-full lg:flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl drop-shadow-2xl">
      <div>
        <ul className="pl-4">
          <NavLink to={"/"}>
            <div className="flex flex-col items-center my-5">
              <h2 className="text-blac font-semibold text-5xl">
                S<span>V.</span>
              </h2>
            </div>
          </NavLink>
          <li className="bg-zinc-50 p-4 rounded-tl-xl rounded-bl-xl">
            <NavLink
              to="/"
              className={` p-4 flex justify-center rounded-xl ${
                activePage === "/"
                  ? "bg-black text-white"
                  : "bg-zinc-50 text-black hover:bg-black hover:text-white duration-300"
              }`}
            >
              <RiHome6Line className="text-2xl" />
            </NavLink>
          </li>
          <li className="relative bg-zinc-50 p-4 rounded-tl-xl rounded-bl-xl group">
            <div
              className={` p-4 flex justify-center rounded-xl ${
                activePage === "/product-list"
                  ? "bg-black text-white"
                  : "bg-zinc-50 text-black hover:bg-black hover:text-white duration-300"
              }`}
            >
              <TbHanger className="text-2xl" />
            </div>
            <ul className="absolute z-50 right-[-150%] top-5 scale-0 p-4 rounded-r-lg  group-hover:scale-100 origin-top-left flex flex-col duration-150 bg-zinc-50 text-lg font-semibold text-gray-500 ">
              <NavLink
                to={"/cat/shirts"}
                className={"hover:text-black hover:scale-110 duration-150"}
              >
                SHIRTS
              </NavLink>
              <NavLink
                to={"/cat/hoodies"}
                className={"hover:text-black hover:scale-110 duration-150"}
              >
                HOODIES
              </NavLink>
              <NavLink
                to={"/cat/coats"}
                className={"hover:text-black hover:scale-110 duration-150"}
              >
                COATS
              </NavLink>
              <NavLink
                to={"/cat/pants"}
                className={"hover:text-black hover:scale-110 duration-150"}
              >
                PANTS
              </NavLink>
              <NavLink
                to={"/cat/shorts"}
                className={"hover:text-black hover:scale-110 duration-150"}
              >
                SHORTS
              </NavLink>
              <NavLink
                to={"/cat/accesories"}
                className={"hover:text-black hover:scale-110 duration-150"}
              >
                ACCESORIES
              </NavLink>
            </ul>
          </li>
          <li className="bg-zinc-50 p-4 rounded-tl-xl rounded-bl-xl">
            <NavLink
              to="./chat"
              className={` p-4 flex justify-center rounded-xl ${
                activePage === "/chat"
                  ? "bg-black text-white"
                  : "bg-zinc-50 text-black hover:bg-black hover:text-white duration-300"
              }`}
            >
              <RiChat1Line className="text-2xl" />
            </NavLink>
          </li>
          <li className="bg-zinc-50 p-4 rounded-tl-xl rounded-bl-xl">
            <NavLink
              to="./cart"
              className={`relative p-4 flex justify-center rounded-xl ${
                activePage === "/cart"
                  ? "bg-black text-white"
                  : "bg-zinc-50 text-black hover:bg-black hover:text-white duration-300"
              }`}
            >
              <RiShoppingCart2Line className="text-2xl" />
              <span
                className={`${
                  cart.length === 0
                    ? `absolute opacity-0`
                    : `absolute opacity-100 transition-opacity duration-500 right-2 text-black text-center rounded-full`
                }`}
              >
                {cart.length}
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <ul className="pl-4">
          <li className="bg-zinc-50 p-4 rounded-tl-xl rounded-bl-xl">
            <NavLink
              to="./FAQS"
              className={` p-4 flex justify-center rounded-xl ${
                activePage === "/FAQS"
                  ? "bg-black text-white"
                  : "bg-zinc-50 text-black hover:bg-black hover:text-white duration-300"
              }`}
            >
              <RiQuestionnaireLine className="text-2xl" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

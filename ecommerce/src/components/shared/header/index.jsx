import React, { useEffect, useState } from "react";
import { RiQuestionnaireLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../searchBar";
import { getProducts } from "../../../database/firebase";

function Header() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative ">
      <header
        className={
          location.pathname === "/"
            ? `absolute z-40 p-6 lg:py-6 w-full bg-gradient-to-b from-black`
            : `relative z-40 p-6 lg:py-6 w-full`
        }
      >
        <div
          className={
            location.pathname === "/"
              ? `lg:hidden w-full flex justify-end text-white`
              : `lg:hidden w-full flex justify-end text-black`
          }
        >
          <Link to={"/FAQS"}>
            <button>
              <RiQuestionnaireLine className="text-2xl md:text-3xl z-auto" />
            </button>
          </Link>
        </div>
        <div className="flex flex-col lg:items-center gap-4">
          <div className="lg:w-full ">
            <div className="lg:ms-80 my-6 flex items-start w-fit">
              <h1
                className={
                  location.pathname === "/"
                    ? `text-white text-5xl tracking-wider lg:text-7xl uppercase font-semibold`
                    : `text-black text-4xl tracking-wider uppercase font-semibold`
                }
              >
                Style
                <br /> Vintage.
              </h1>
            </div>
          </div>
          <SearchBar placeholder={"Search"} data={products} />
        </div>
        <ul
          className={
            location.pathname === "/"
              ? `hidden lg:hidden lg:justify-between lg:mx-80 border-b-2 py-4 mt-8 border-white uppercase text-white font-semibold`
              : `hidden lg:flex lg:justify-between lg:mx-80 border-b-2 py-4 mt-8 border-black uppercase text-black font-semibold`
          }
        >
          <li>
            <Link
              to={"/cat/shirts"}
              className={
                location.pathname === "/cat/shirts"
                  ? `bg-black text-white px-2 py-1 transition-all hover:text-gray-300 duration-300`
                  : `transition-all hover:text-gray-300 duration-300`
              }
            >
              Shirts
            </Link>
          </li>
          <li>
            <Link
              to={"/cat/hoodies"}
              className={
                location.pathname === "/cat/hoodies"
                  ? `bg-black text-white px-2 py-1 transition-all hover:text-gray-300 duration-300`
                  : `transition-all hover:text-gray-300 duration-300`
              }
            >
              Hoodies
            </Link>
          </li>
          <li>
            <Link
              to={"/cat/coats"}
              className={
                location.pathname === "/cat/coats"
                  ? `bg-black text-white px-2 py-1 transition-all hover:text-gray-300 duration-300`
                  : `transition-all hover:text-gray-300 duration-300`
              }
            >
              Coats
            </Link>
          </li>
          <li>
            <Link
              to={"/cat/pants"}
              className={
                location.pathname === "/cat/pants"
                  ? `bg-black text-white px-2 py-1 transition-all hover:text-gray-300 duration-300`
                  : `transition-all hover:text-gray-300 duration-300`
              }
            >
              Pants
            </Link>
          </li>
          <li>
            <Link
              to={"/cat/shorts"}
              className={
                location.pathname === "/cat/shorts"
                  ? `bg-black text-white px-2 py-1 transition-all hover:text-gray-300 duration-300`
                  : `transition-all hover:text-gray-300 duration-300`
              }
            >
              Shorts
            </Link>
          </li>
          <li>
            <Link
              to={"/cat/accesories"}
              className={
                location.pathname === "/cat/accesories"
                  ? `bg-black text-white px-2 py-1 transition-all hover:text-gray-300 duration-300`
                  : `transition-all hover:text-gray-300 duration-300`
              }
            >
              Accesories
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;

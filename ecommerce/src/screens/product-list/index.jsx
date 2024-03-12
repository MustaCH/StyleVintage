import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../../components/shared";

function ProductList() {
  const location = useLocation();
  return (
    <div>
      <div className={location.pathname === "/" ? `hidden` : ``}>
        <Header />
      </div>

      <div className="mb-20 lg:my-0 flex flex-col gap-0 lg:grid lg:grid-cols-2 lg:gap-0 items-center uppercase text-white lg:text-gray-500 font-semibold text-4xl lg:text-8xl ">
        <Link
          to={"/cat/shirts"}
          className="lg:my-0 relative flex justify-center transition-all drop-shadow-xl hover:text-white group"
        >
          <p className="absolute z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] group-hover:scale-105 duration-300">
            shirts
          </p>
          <img
            src="https://i.ibb.co/QKthhjn/shirt-cat.jpg"
            alt="categorie-header"
            className="brightness-50 w-full"
          />
        </Link>
        <Link
          to={"/cat/hoodies"}
          className="lg:my-0 relative flex justify-center transition-all drop-shadow-xl hover:text-white group"
        >
          <p className="absolute z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] group-hover:scale-105 duration-300">
            hoodies
          </p>
          <img
            src="https://i.ibb.co/wz5HMJs/hoodie-cat.jpg"
            alt="categorie-header"
            className="brightness-50  w-full"
          />
        </Link>
        <Link
          to={"/cat/coats"}
          className="lg:my-0 relative flex justify-center  transition-all drop-shadow-xl hover:text-white group"
        >
          <p className="absolute z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] group-hover:scale-105 duration-300">
            coats
          </p>
          <img
            src="https://i.ibb.co/ZxYTy46/coat-cat.jpg"
            alt="categorie-header"
            className="brightness-50 w-full"
          />
        </Link>
        <Link
          to={"/cat/pants"}
          className="lg:my-0 relative flex justify-center transition-all drop-shadow-xl hover:text-white group"
        >
          <p className="absolute z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] group-hover:scale-105 duration-300">
            pants
          </p>
          <img
            src="https://i.ibb.co/qRyXsnz/pant-cat.jpg"
            alt="categorie-header"
            className="brightness-50 w-full"
          />
        </Link>
        <Link
          to={"/cat/shorts"}
          className="lg:my-0 relative flex justify-center transition-all drop-shadow-xl hover:text-white group"
        >
          <p className="absolute z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] group-hover:scale-105 duration-300">
            shorts
          </p>
          <img
            src="https://i.ibb.co/gSMkWkB/short-cat.jpg"
            alt="categorie-header"
            className="brightness-50 w-full"
          />
        </Link>
        <Link
          to={"/cat/accesories"}
          className="lg:my-0 relative flex justify-center transition-all drop-shadow-xl hover:text-white group "
        >
          <p className="absolute z-10 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] group-hover:scale-105 duration-300">
            accesories
          </p>
          <img
            src="https://i.ibb.co/j8vpxQh/accesorie-cat.jpg"
            alt="categorie-header"
            className="brightness-50 w-full"
          />
        </Link>
      </div>
    </div>
  );
}

export default ProductList;

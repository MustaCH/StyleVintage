import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const newSearch = data.filter((value) => {
      return (
        value.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.cat.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newSearch);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setFilteredData([]);
    }, 200);
  };

  return (
    <form
      id="search_bar"
      name="search_bar"
      className={
        location.pathname === "/"
          ? `hidden`
          : `lg:hidden relative w-full lg:w-1/2 group`
      }
    >
      <div className="w-full relative z-10 ">
        <RiSearchLine
          className={
            location.pathname === "/NXBOStore"
              ? `absolute left-3 top-1/2 -translate-y-1/2 text-white`
              : `absolute left-3 top-1/2 -translate-y-1/2 text-black`
          }
        />
        <input
          id="search_bar"
          type="text"
          onChange={handleFilter}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={
            location.pathname === "/NXBOStore"
              ? `bg-transparent  w-full py-2 pl-10 pr-4 rounded-lg text-white outline-none border-2 border-zinc-50/30  focus:bg-zinc-400/30 focus:border-zinc-50/50`
              : `bg-transparent  w-full py-2 pl-10 pr-4 rounded-lg text-black outline-none border-2 border-black/30   focus:border-black/60`
          }
        />
      </div>
      {filteredData.length !== 0 && (
        <ul className="cart-scroll absolute flex flex-col rounded-bl-lg rounded-br-lg justify-start w-full z-50 bg-zinc-50/20  p-5 shadow-2xl max-h-96 min-h-fit overflow-auto sc">
          {filteredData.map((value, key) => {
            return (
              <Link
                to={`/cat/:catid/${value.id}`}
                key={key}
                className="flex items-center gap-4 text-black p-2 my-1 bg-zinc-300 border-2 border-transparent rounded-lg hover:border-orange-500 hover:scale-[102%] duration-150"
              >
                <img
                  className="w-10 rounded-full"
                  src={value.pic1}
                  alt={value.title}
                />
                {value.title}
                <span className="text-black/50 text-xs">{value.cat}</span>
              </Link>
            );
          })}
        </ul>
      )}
    </form>
  );
}

export default SearchBar;

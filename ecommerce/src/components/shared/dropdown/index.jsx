import React, { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

function Dropdown({
  name,
  options,
  hidden,
  selectedOption,
  setSelectedOption,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(true);
  };

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className={`${
        hidden === true
          ? "hidden"
          : "relative flex justify-between w-1/2 mx-1 rounded-lg bg-zinc-800 px-2 py-2 hover:bg-zinc-700 text-gray-300 uppercase cursor-pointer"
      }`}
    >
      <p>{selectedOption || name}</p>
      <button>{!isOpen ? <RiArrowDownSLine /> : <RiArrowUpSLine />}</button>
      {isOpen && (
        <div className="absolute bg-zinc-800 top-12 left-0 flex flex-col rounded-lg p-2 w-full cursor-pointer">
          {options.map((item, i) => (
            <div
              className="hover:bg-orange-600 hover:text-black hover:font-semibold duration-150 w-full rounded-lg p-2 text-center cursor-pointer"
              key={i}
              onClick={() => handleOptionClick(item)}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;

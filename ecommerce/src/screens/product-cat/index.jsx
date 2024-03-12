import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategory } from "../../database/firebase";
import { RiArrowLeftSLine, RiEmotionUnhappyLine } from "react-icons/ri";
import { Card, Header } from "../../components/shared";

function ProductCat() {
  const { catid } = useParams();
  const [category, setCategory] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const availableProducts = filteredCategory.filter(
    (product) => product.stock > 0
  );
  const unavailableProducts = filteredCategory.filter(
    (product) => product.stock === 0
  );
  const allProducts = [...availableProducts, ...unavailableProducts];
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const productsData = await getCategory(catid);
      setCategory(productsData);
    }
    fetchProducts();
  }, [catid]);

  useEffect(() => {
    if (filter === "lowest") {
      const lowestToHighest = category
        .slice()
        .sort((a, b) => a.price - b.price);
      setFilteredCategory(lowestToHighest);
    } else if (filter === "highest") {
      const highestToLowest = category
        .slice()
        .sort((a, b) => b.price - a.price);
      setFilteredCategory(highestToLowest);
    } else if (filter === "lastAvailable") {
      const lastAvailable = category.filter((product) => product.stock <= 10);
      setFilteredCategory(lastAvailable);
    } else if (filter === "discount") {
      const discountedProducts = category.filter(
        (product) => product.discount > 0
      );
      setFilteredCategory(discountedProducts);
    } else {
      setFilteredCategory(category);
    }
  }, [category, filter]);

  const handleFilterClick = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const clearFilter = () => {
    setFilter("");
  };

  return (
    <div className="lg:ps-28 lg:pb-14">
      <Link
        onClick={() => navigate(-1)}
        className="relative z-50 flex justify-end"
      >
        <RiArrowLeftSLine className="absolute left-4 top-4 p-2 box-content text-gray-300 bg-zinc-900 rounded-full text-xl hover:scale-110 duration-150" />
      </Link>
      <Header />
      <h2 className="font-bold text-black text-5xl lg:text-6xl uppercase text-center border-b-2 border-b-black-600 py-6 lg:pb-6">
        {catid}
      </h2>
      <div className="hidden flex-col md:flex-row justify-center my-12 text-white items-center">
        <p className="font-bold text-lg pb-5 md:pb-0">Filter by:</p>
        <div className="flex w-full divide-x divide-zinc-800 md:divide-x-0 md:w-fit md:gap-4 mx-5 items-center">
          <button
            className={`uppercase text-sm  p-1 lg:p-2  lg:hover:bg-orange-600    md:rounded-xl shadow-lg ${
              filter === "lowest"
                ? "bg-orange-600 font-semibold "
                : "bg-orange-800"
            }`}
            onClick={() => handleFilterClick("lowest")}
          >
            Lowest price
          </button>
          <button
            className={`uppercase text-sm  p-1 lg:p-2  lg:hover:bg-orange-600    md:rounded-xl shadow-lg ${
              filter === "highest"
                ? "bg-orange-600  font-semibold"
                : "bg-orange-800"
            }`}
            onClick={() => handleFilterClick("highest")}
          >
            Highest price
          </button>
          <button
            className={`uppercase text-sm  p-1 lg:p-2  lg:hover:bg-orange-600 md:rounded-xl shadow-lg ${
              filter === "lastAvailable"
                ? "bg-orange-600  font-semibold"
                : "bg-orange-800"
            }`}
            onClick={() => handleFilterClick("lastAvailable")}
          >
            last available
          </button>
          <button
            className={`uppercase text-sm  p-1 lg:p-2  lg:hover:bg-orange-600   md:rounded-xl shadow-lg ${
              filter === "discount"
                ? "bg-orange-600 font-semibold"
                : "bg-orange-800"
            }`}
            onClick={() => handleFilterClick("discount")}
          >
            discounts %
          </button>
        </div>
        <button
          className={`${
            filter === ""
              ? "hidden"
              : "text-rose-600 text-sm uppercase pt-5 lg:pt-0"
          }`}
          onClick={clearFilter}
        >
          Clear filter
        </button>
      </div>
      <div className="flex flex-col items-center md:flex-row md:flex-wrap justify-center mb-28 lg:mb-0 gap-4">
        {filteredCategory.length === 0 ? (
          <div className="flex flex-col items-center text-white py-12  font-bold">
            <p className="text-2xl pb-4">No products available</p>
            <RiEmotionUnhappyLine className="text-6xl" />
          </div>
        ) : (
          allProducts.map((product) => (
            <Card key={product.id} product={product} btnText={"See more"} />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductCat;

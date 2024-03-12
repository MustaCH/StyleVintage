import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategory, getProduct } from "../../database/firebase";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Card, Dropdown, Header } from "../../components/shared/index";
import { CartContext } from "../../storage/cart-context";

const sizes = ["s", "m", "l", "xl"];
const quantity = [1, 2, 3, 4, 5];

function ProductDetail() {
  const [product, setProduct] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // Estado para el tamaño seleccionado
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [sizePopUp, setSizePopUp] = useState(false);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const nextSlide = () => {
    currentIndex === 2 ? setCurrentIndex(1) : setCurrentIndex(2);
  };

  const prevSlide = () => {
    currentIndex === 1 ? setCurrentIndex(2) : setCurrentIndex(1);
  };

  useEffect(() => {
    getProduct(params.itemid)
      .then((response) => {
        setProduct(response);
        getCategory(response.cat)
          .then((related) => {
            const filteredRelated = related.filter(
              (item) => item.id !== params.itemid
            );
            setRelatedProducts(filteredRelated.slice(0, 3));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [params.itemid]);

  const isSizeValid = product.size === "one size" || selectedOption !== "";

  const chooseSize = () => {
    setSizePopUp(true);
  };

  useEffect(() => {
    if (sizePopUp) {
      const timer = setTimeout(() => {
        setSizePopUp(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [sizePopUp]);

  const handleAddToCart = () => {
    if (product.stock !== 0) {
      const selectedProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        pic1: product.pic1,
        discount: product.discount,
        size: selectedOption,
        quantity: selectedQuantity,
      };
      cartContext.addToCart(selectedProduct);
      setPopupVisible(true);
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      const timer = setTimeout(() => {
        setPopupVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPopupVisible]);

  return (
    <div className="lg:ps-28">
      <Link
        onClick={() => navigate(-1)}
        className="relative flex justify-end z-50"
      >
        <RiArrowLeftSLine className="absolute left-4 top-4 p-2 box-content text-gray-300 bg-zinc-900 rounded-full text-xl hover:scale-110 duration-150 " />
      </Link>
      <div
        className={`${
          isPopupVisible
            ? `fixed top-5 lg:top-10 lg:right-5 z-50 opacity-100 transition-opacity duration-500 bg-orange-600 text-white font-semibold w-fit px-2 py-2 rounded-tr-lg rounded-br-lg lg:rounded-lg curso pointer-events-none`
            : `fixed top-5 lg:top-10 lg:right-5 z-50 opacity-0 transition-opacity duration-500 bg-orange-600 text-white font-semibold w-fit px-2 py-2 rounded-tr-lg rounded-br-lg lg:rounded-lg curso pointer-events-none`
        }`}
      >
        <p>{`${isSizeValid ? `Added to cart` : `Choose a size`}`}</p>
      </div>
      <Header />
      <div className=" flex justify-center pt-6 pb-24 md:py-12 px-1 md:px-0">
        <div className="flex flex-col md:flex-row justify-between p-6 lg:p-8 bg-zinc-50 w-full lg:w-1/2 rounded-xl">
          <div className="md:me-6 relative flex align-center">
            <img
              className={`${currentIndex === 1 ? "inline" : "hidden"}`}
              src={product.pic1}
              alt={product.title}
            />
            <img
              className={`${currentIndex === 1 ? "hidden" : "inline "} ${
                product.pic2 === "" ? "hidden" : "inline"
              }`}
              src={product.pic2}
              alt={product.title}
            />
            <div
              className={`${
                product.pic2 === ""
                  ? "hidden"
                  : "absolute top-[50%] -translate-x-0 translate-y-[-50%] left-1 md:left-5 text-3xl rounded-full p-2  text-black cursor-pointer"
              } `}
            >
              <RiArrowLeftSLine onClick={prevSlide} />
            </div>
            <div
              className={`${
                product.pic1 === ""
                  ? "hidden"
                  : "absolute top-[50%] -translate-x-0 translate-y-[-50%] right-1 md:right-5 text-3xl rounded-full p-2  text-black cursor-pointer"
              }`}
            >
              <RiArrowRightSLine onClick={nextSlide} />
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col justify-between">
            <div className="flex flex-col gap-6 uppercase text-black">
              <h2 className="text-4xl lg:text-5xl font-semibold">
                {product.title}
              </h2>
              <div className="flex items-center gap-3">
                <p
                  className={`${
                    product.stock === 0
                      ? "text-3xl flex items-center text-gray-300/50 line-through"
                      : "text-3xl flex items-center"
                  }`}
                >
                  $
                  <span
                    className={`${
                      product.stock === 0
                        ? "text-gray-300/50"
                        : "text-black ps-1"
                    }`}
                  >
                    {product.discount > 0
                      ? product.price - product.discount
                      : product.price}
                  </span>
                  <span
                    className={`${
                      product.discount === 0 || product.stock === 0
                        ? "hidden"
                        : "inline text-base text-red-600 ms-2"
                    }`}
                  >
                    -{product.discount}%
                  </span>
                </p>
                <span
                  className={`${
                    product.stock === 0
                      ? "inline text-xl text-gray-300"
                      : "hidden"
                  }`}
                >
                  SOLD OUT
                </span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <p>
                  Sizes: <span className="text-zinc-500">{product.size}</span>
                </p>
                <button className="bg-zinc-800 p-1 text-white lg:hover:bg-zinc-50 duration-150 rounded-xl uppercase hover:text-black text-xs md:text-sm w-2/5 shadow-xl">
                  See size chart
                </button>
              </div>
              <div className="relative flex justify-between uppercase text-gray-300 pb-4">
                <Dropdown
                  name="choose size"
                  hidden={product.size === "one size" ? true : false}
                  options={sizes}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
                <Dropdown
                  name="quantity"
                  options={quantity}
                  selectedOption={selectedQuantity}
                  setSelectedOption={setSelectedQuantity}
                />
                <div
                  className={`${
                    sizePopUp === false
                      ? `hidden`
                      : `absolute bottom-16 left-6 duration-500 text-red-500 font-semibold w-fit px-1 py-1 rounded-lg`
                  }`}
                >
                  <p>select a size</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <Link
                to={`${
                  isSizeValid && product.stock !== 0
                    ? `/cart`
                    : `/cat/:catid/${product.id}`
                }`}
                onClick={isSizeValid ? handleAddToCart : chooseSize}
                className={`${
                  product.stock !== 0
                    ? `text-center bg-zinc-200 p-2 lg:hover:bg-zinc-500 duration-150 mt-2 rounded-xl uppercase text-black font-semibold shadow-xl`
                    : `text-center bg-zinc-300 p-2 mt-2 rounded-xl uppercase text-gray-600 font-semibold shadow-xl cursor-not-allowed`
                }`}
              >
                Buy
              </Link>
              <button
                onClick={isSizeValid ? handleAddToCart : chooseSize}
                className={`${
                  product.stock !== 0
                    ? `bg-zinc-500 p-2 lg:hover:bg-zinc-800 duration-150 mt-2 rounded-xl uppercase text-gray-200 font-semibold shadow-xl`
                    : `bg-zinc-500 p-2  mt-2 rounded-xl uppercase text-gray-600 font-semibold shadow-xl cursor-not-allowed`
                }`}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="  pb-24 md:px-6 lg:pt-12 border-t-2 border-black">
          <h3 className="text-black text-center uppercase font-semibold text-2xl mb-2 mt-2">
            Similar Products:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                product={relatedProduct}
                btnText={"See more"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;

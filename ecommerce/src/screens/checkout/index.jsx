import React, { useContext, useState } from "react";
import { Input } from "../../components/shared";
import { CartContext } from "../../storage/cart-context";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";
import { BiLinkExternal } from "react-icons/bi";
import { addDoc, collection, updateDoc, doc, getDoc } from "firebase/firestore";
import db from "../../database/firebase";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

function Checkout() {
  initMercadoPago("TEST-d4eee2b8-fd84-4e81-83dd-1ba561b75f4e", {
    locale: "es-AR",
  });
  const [preferenceId, setPreferenceId] = useState(null);
  const [validName, setValidName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validId, setValidId] = useState(false);
  const [validPostal, setValidPostal] = useState(false);
  const [validAddress, setValidAddress] = useState(false);
  const [validEmail, setValidEmail] = useState("");
  const [isPayAttempted, setIsPayAttempted] = useState(false);
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();

  const totalDiscount = cart.reduce((total, product) => {
    return total + product.discount;
  }, 0);

  const totalPrice = cart.reduce((total, product) => {
    const productPrice = (product.price - product.discount) * product.quantity;
    return total + productPrice;
  }, 0);

  const handleValidName = (e) => {
    let value = e.target.value;
    setValidName(value);
    if (validName === "") {
      setValidName(!!value);
    }
  };

  const handleValidLastName = (e) => {
    let value = e.target.value;
    setValidLastName(value);
    if (validLastName === "") {
      setValidLastName(!!value);
    }
  };

  const handleValidId = (e) => {
    let value = e.target.value;
    setValidId(value);
    if (validId === "") {
      setValidId(!!value);
    }
  };

  const handleValidPostal = (e) => {
    let value = e.target.value;
    setValidPostal(value);
    if (validPostal === "") {
      setValidPostal(!!value);
    }
  };

  const handleValidAddress = (e) => {
    let value = e.target.value;
    setValidAddress(value);
    if (validAddress === "") {
      setValidAddress(!!value);
    }
  };

  const handleValidEmail = (e) => {
    const value = e.target.value;
    if (isValidEmail(value)) {
      setValidEmail(value);
    } else {
      setValidEmail("");
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleBuy = async () => {
    const id = await createPreference();
    setIsPayAttempted(true);

    if (
      !validName ||
      !validLastName ||
      !validId ||
      !validPostal ||
      !validAddress ||
      !validEmail
    ) {
      alert("Please complete all fields correctly.");
      return;
    } else if (id) {
      setPreferenceId(id);
    }

    const orderData = {
      firstName: validName,
      lastName: validLastName,
      ID: validId,
      postal: validPostal,
      address: validAddress,
      email: validEmail,

      products: cart.map((product) => ({
        productId: product.id,
        productName: product.title,
        quantity: product.quantity,
      })),
    };

    localStorage.setItem("lastOrder", JSON.stringify(orderData));
  };

  const createPreference = async () => {
    try {
      const productsData = cart.map((product) => ({
        title: product.title,
        quantity: product.quantity,
        price: product.price - product.discount,
      }));

      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          products: productsData,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="lg:pl-28 grid ">
      <Link onClick={() => navigate(-1)} className="relative h-16 lg:h-0 w-4">
        <RiArrowLeftSLine className="absolute lg:fixed left-4 top-4 lg:left-32 p-2 box-content text-gray-300 bg-zinc-900 rounded-full text-xl" />
      </Link>
      <div className="place-self-center lg:mt-6 mb-24">
        <div className="flex flex-col bg-zinc-200 text-black rounded-xl py-6 lg:px-4 w-96	lg:w-full">
          <legend className="text-3xl font-bold text-start mb-4 ps-4 lg:ps-0">
            Checkout
          </legend>
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-4 px-4 lg:px-0">
              <div className="flex flex-col lg:flex-row gap-4 ">
                <div className="flex flex-col">
                  <Input
                    label={"First name:"}
                    labelFor={"firstname"}
                    name={"firstname"}
                    type={"text"}
                    optional={false}
                    onChange={handleValidName}
                  />
                  <p
                    className={`${
                      isPayAttempted && !validName
                        ? `text-red-500 uppercase text-xs`
                        : `hidden`
                    }`}
                  >
                    Please enter a name
                  </p>
                </div>
                <div className="flex flex-col">
                  <Input
                    label={"Last name:"}
                    labelFor={"lastname"}
                    name={"lastname"}
                    type={"text"}
                    optional={false}
                    onChange={handleValidLastName}
                  />
                  <p
                    className={`${
                      isPayAttempted && !validLastName
                        ? `text-red-500 uppercase text-xs`
                        : `hidden`
                    }`}
                  >
                    Please enter a lastname
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Input
                    label={"ID:"}
                    labelFor={"id"}
                    name={"id"}
                    type={"text"}
                    customStyle={"w-full"}
                    optional={false}
                    onChange={handleValidId}
                  />
                  <p
                    className={`${
                      isPayAttempted && !validId
                        ? `text-red-500 uppercase text-xs`
                        : `hidden`
                    }`}
                  >
                    Please enter your ID
                  </p>
                </div>
                <div>
                  <Input
                    label={"Postal code:"}
                    labelFor={"postal"}
                    name={"postal"}
                    type={"text"}
                    customStyle={"w-full"}
                    optional={false}
                    onChange={handleValidPostal}
                  />
                  <p
                    className={`${
                      isPayAttempted && !validPostal
                        ? `text-red-500 uppercase text-xs`
                        : `hidden`
                    }`}
                  >
                    Please enter your postal code
                  </p>
                </div>
              </div>
              <Input
                label={"Shipping address:"}
                labelFor={"addres"}
                name={"address"}
                type={"address"}
                customStyle={"lg:w-96"}
                optional={false}
                onChange={handleValidAddress}
              />
              <p
                className={`${
                  isPayAttempted && !validAddress
                    ? `text-red-500 uppercase text-xs`
                    : `hidden`
                }`}
              >
                Please enter your address
              </p>
              <div className="flex flex-col lg:flex-row gap-4">
                <Input
                  label={"Phone number:"}
                  labelFor={"phone"}
                  name={"phone"}
                  type={"tel"}
                />
                <div className="flex flex-col">
                  <Input
                    label={"E-mail:"}
                    labelFor={"email"}
                    name={"email"}
                    type={"email"}
                    optional={false}
                    onChange={handleValidEmail}
                  />
                  <p
                    className={`${
                      isPayAttempted && !isValidEmail(validEmail)
                        ? `text-red-500 uppercase text-xs`
                        : `hidden`
                    }`}
                  >
                    Please enter a valid email
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 items-center  lg:justify-between mt-8">
                <button
                  onClick={handleBuy}
                  className="px-4 py-4  w-80 lg:w-full text-center text-white font-bold rounded-lg bg-gradient-to-r from-zinc-500 to-zinc-900"
                >
                  Ir a pagar
                </button>

                {preferenceId && cart.length !== 0 ? (
                  <Wallet
                    className="w-64"
                    initialization={{ preferenceId: preferenceId }}
                    customization={{
                      texts: { valueProp: "security_safety" },
                    }}
                  />
                ) : null}
                <Link
                  to={"/cart"}
                  className="px-4 py-2  w-80 lg:w-full text-center  text-red-500 font-bold bg-zinc-300 rounded-lg hover:bg-red-500 hover:text-white  duration-300"
                >
                  Cancelar
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2 h-fit text-start lg:text-end lg:justify-between text-xl mt-4 lg:ms-20 px-4">
              <h2 className="text-3xl font-semibold">Summary:</h2>
              <p>Total products: {cart.length}</p>
              <Link
                to={"/cart"}
                className="text-red-500 flex items-center gap-1 justify-start lg:justify-end"
              >
                Ver carrito <BiLinkExternal />
              </Link>
              <h3>Shipping: Free</h3>
              <h3 className="text-black/50">Discount: -{totalDiscount}%</h3>
              <h3 className="text-3xl text-white font-bold bg-gradient-to-r from-zinc-500 to-zinc-900 px-2 py-1 rounded-lg">
                Total: ${totalPrice}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

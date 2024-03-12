import React, { useContext, useEffect, useState } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import { CartContext } from "../../storage/cart-context";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../database/firebase";

function Confirmation() {
  const { cart, clearCart } = useContext(CartContext);
  const [orderData, setOrderData] = useState(null);
  const [showProcessing, setShowProcessing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar la información de la orden desde el localStorage
    const storedOrder = localStorage.getItem("lastOrder");
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
    }

    // Resto del código del useEffect (timeout para mostrar el mensaje de procesamiento)
    const timer = setTimeout(() => {
      setShowProcessing(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []); // El segundo argumento del useEffect es un array vacío para ejecutarlo solo una vez al montar el componente

  // Función para la lógica de creación de la orden
  const createOrder = async () => {
    const orderData = {
      // ... (tu código existente)
    };

    const ordersRef = collection(db, "Orders");
    const newOrder = await addDoc(ordersRef, orderData);

    for (const product of cart) {
      const productId = product.id;
      const productRef = doc(db, "products", productId);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data();
        const newStock = productData.stock - product.quantity;

        await updateDoc(productRef, { stock: newStock });
      }
    }

    console.log("Orden creada con éxito", newOrder);

    // Almacenar la información de la orden en el localStorage
    localStorage.setItem("lastOrder", JSON.stringify(orderData));
  };

  // useEffect para ejecutar la lógica de creación de orden al montar el componente
  useEffect(() => {
    createOrder();
    // Resto del código del useEffect (timeout para mostrar el mensaje de procesamiento)
    const timer = setTimeout(() => {
      setShowProcessing(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const finish = () => {
    // Puedes hacer lo que necesites con orderData antes de limpiar el localStorage y navegar
    localStorage.removeItem("lastOrder");
    localStorage.clear(); // Vaciar completamente el localStorage
    navigate("/NXBOStore");
  };

  return (
    <div className="lg:ps-28 text-gray-300">
      <div className="flex flex-col gap-8 my-52 justify-center items-center">
        <h2 className="text-2xl font-bold text-center">
          Done! We have confirmed your purchase
        </h2>
        <p className="text-xl">Here is what you bought</p>
        <ul className="flex flex-col gap-4 bg-zinc-900 p-8 rounded-lg">
          {orderData && orderData.products ? (
            orderData.products.map((product) => (
              <li key={product.productId}>
                {product.productName} - Quantity: {product.quantity}
              </li>
            ))
          ) : (
            <p>No products in the order</p>
          )}
        </ul>
        <h3 className="text-lg font-bold">
          Final price: {orderData && orderData.totalPrice}
        </h3>
        <button
          onClick={finish}
          className="bg-orange-500 text-zinc-900 font-semibold p-3 rounded-xl"
        >
          Back to store
        </button>
      </div>
    </div>
  );
}

export default Confirmation;

import { initializeApp } from "firebase/app";
import "firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { subYears } from "date-fns";

const firebaseConfig = {
  apiKey: "AIzaSyA3g_AgTxtRSS3qjxpC_-iahGYI0KIyiDM",
  authDomain: "nxbostore.firebaseapp.com",
  projectId: "nxbostore",
  storageBucket: "nxbostore.appspot.com",
  messagingSenderId: "718443366114",
  appId: "1:718443366114:web:15d6695b7aeaed8042c0bb",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getProducts() {
  const productsRef = collection(db, "products");
  let q;
  q = query(productsRef);
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map((item) => ({
    ...item.data(),
    id: item.id,
  }));
  return products;
}

export async function getLatestReleases() {
  const oneYearAgo = subYears(new Date(), 1);

  const productsRef = collection(db, "products");
  const q = query(
    productsRef,
    where("date", ">=", oneYearAgo),
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(q);
  const products = snapshot.docs.map((item) => ({
    ...item.data(),
    id: item.id,
  }));
  return products;
}

export async function getCatLatest(catid) {
  const productsRef = collection(db, "products");
  const currentDate = new Date().getTime();
  const q = query(
    productsRef,
    where("cat", "==", catid),
    where("date", ">=", currentDate)
  );
  const snapshot = await getDocs(q);

  const catLatest = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return catLatest;
}

export async function getLastAvailable() {
  const productsRef = collection(db, "products");
  const queryStockLessThan10 = query(productsRef, where("stock", "<", 10));
  const queryStockGreaterThan0 = query(productsRef, where("stock", ">", 0));
  const snapshotStockLessThan10 = await getDocs(queryStockLessThan10);
  const snapshotStockGreaterThan0 = await getDocs(queryStockGreaterThan0);
  const productsLessThan10 = snapshotStockLessThan10.docs.map((item) => ({
    ...item.data(),
    id: item.id,
  }));
  const productsGreaterThan0 = snapshotStockGreaterThan0.docs.map((item) => ({
    ...item.data(),
    id: item.id,
  }));
  const products = productsLessThan10.filter((product) =>
    productsGreaterThan0.some((p) => p.id === product.id)
  );

  return products;
}

export async function getDiscountedProducts() {
  const productsRef = collection(db, "products");
  const q = query(productsRef, where("discount", ">", 0));
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map((item) => ({
    ...item.data(),
    id: item.id,
  }));
  return products;
}

export async function getCategory(cat) {
  const productsRef = collection(db, "products");
  const q = query(productsRef, where("cat", "==", cat));
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map((item) => ({
    ...item.data(),
    id: item.id,
  }));
  return products;
}

export async function getProduct(id) {
  const productsRef = collection(db, "products");
  const docRef = doc(productsRef, id);
  const snapshot = await getDoc(docRef);
  return { ...snapshot.data(), id: snapshot.id };
}

export default db;

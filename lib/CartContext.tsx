"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  modelUrl?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // ✅ تحقق من حالة تسجيل الدخول
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const cartRef = collection(db, "users", user.uid, "cart");
        const snapshot = await getDocs(cartRef);
        const firestoreCart = snapshot.docs.map((doc) => doc.data() as CartItem);
        setCart(firestoreCart);
      } else {
        const local = localStorage.getItem("cart");
        setCart(local ? JSON.parse(local) : []);
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ مزامنة localStorage فقط لو مفيش تسجيل دخول
  useEffect(() => {
    if (!userId) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, userId]);

  const addToCart = async (item: CartItem) => {
    const exists = cart.find((i) => i.id === item.id);
    if (exists) return toast.error("❌ Already in cart!");

    const updated = [...cart, item];
    setCart(updated);

    if (userId) {
      await setDoc(doc(db, "users", userId, "cart", item.id), item);
    }
    toast.success("✅ Added to cart!");
  };

  const increaseQuantity = async (id: string) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);

    if (userId) {
      const updatedItem = updated.find((item) => item.id === id)!;
      await setDoc(doc(db, "users", userId, "cart", id), updatedItem);
    }
  };

  const decreaseQuantity = async (id: string) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    setCart(updated);

    if (userId) {
      const updatedItem = updated.find((item) => item.id === id)!;
      await setDoc(doc(db, "users", userId, "cart", id), updatedItem);
    }
  };

  const removeFromCart = async (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);

    if (userId) {
      await deleteDoc(doc(db, "users", userId, "cart", id));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

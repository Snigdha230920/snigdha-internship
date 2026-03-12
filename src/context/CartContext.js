import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);

  const deliveryFee = 50;       // ₹50
  const taxRate = 0.18;         // 18%

  // =============================
  // ADD TO CART
  // =============================
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // =============================
  // INCREASE QUANTITY
  // =============================
  const increaseQuantity = (index) => {
    setCart(
      cart.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // =============================
  // DECREASE QUANTITY
  // =============================
  const decreaseQuantity = (index) => {
    setCart(
      cart
        .map((item, i) =>
          i === index
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // =============================
  // REMOVE ITEM (trash icon)
  // =============================
  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // =============================
  // CLEAR CART (after payment)
  // =============================
  const clearCart = () => {
    setCart([]);
  };

  // =============================
  // CALCULATIONS
  // =============================
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * taxRate;
  const total = subtotal - discount + deliveryFee + tax;

  // =============================
  // COUPON
  // =============================
  const applyCoupon = (code) => {
    if (code === "SAVE10") {
      setDiscount(100);   // ₹100 off
    } else {
      setDiscount(0);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,     // ✅ IMPORTANT
        subtotal,
        discount,
        deliveryFee,
        tax,
        total,
        applyCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
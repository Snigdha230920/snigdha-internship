import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    deliveryFee,
  } = useCart();

  /* COUPON STATES (LOAD FROM LOCAL STORAGE) */

  const [coupon, setCoupon] = useState(
    localStorage.getItem("coupon") || ""
  );

  const [discount, setDiscount] = useState(
    Number(localStorage.getItem("discount")) || 0
  );

  const [discountPercent, setDiscountPercent] = useState(
    Number(localStorage.getItem("discountPercent")) || 0
  );

  const [couponApplied, setCouponApplied] = useState(
    localStorage.getItem("couponApplied") === "true"
  );

  /* LOAD SELECTED ITEMS */

  const [selectedItems, setSelectedItems] = useState(() => {
    const saved = localStorage.getItem("selectedItems");
    return saved ? JSON.parse(saved) : [];
  });

  /* SAVE SELECTED ITEMS */

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const FREE_DELIVERY_LIMIT = 500;
  const TAX_RATE = 0.05;

  /* SELECT PRODUCT */

  const handleSelect = (index) => {

    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }

  };

  /* SUBTOTAL */

  const subtotal = cart
    .filter((_, index) => selectedItems.includes(index))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  /* TAX */

  const calculatedTax =
    subtotal > 0 ? (subtotal - discount) * TAX_RATE : 0;

  /* DELIVERY FEE */

  const finalDeliveryFee =
    subtotal === 0
      ? 0
      : subtotal >= FREE_DELIVERY_LIMIT
      ? 0
      : deliveryFee;

  /* FREE DELIVERY BAR */

  const remaining = Math.max(FREE_DELIVERY_LIMIT - subtotal, 0);
  const progress = Math.min((subtotal / FREE_DELIVERY_LIMIT) * 100, 100);

  /* APPLY COUPON */

  const applyCoupon = () => {

    const code = coupon.toLowerCase();

    let newDiscount = 0;
    let newPercent = 0;

    if (code === "green10") {
      newPercent = 10;
      newDiscount = subtotal * 0.10;
    }

    else if (code === "save20") {
      newPercent = 20;
      newDiscount = subtotal * 0.20;
    }

    else if (code === "first50") {
      newPercent = 0;
      newDiscount = 50;
    }

    else {
      alert("Invalid Coupon Code");
      return;
    }

    setDiscount(newDiscount);
    setDiscountPercent(newPercent);
    setCouponApplied(true);

    /* SAVE COUPON */

    localStorage.setItem("coupon", code);
    localStorage.setItem("discount", newDiscount);
    localStorage.setItem("discountPercent", newPercent);
    localStorage.setItem("couponApplied", true);

  };

  /* TOTAL */

  const total =
    subtotal - discount + finalDeliveryFee + calculatedTax;

  /* DELIVERY DATE */

  const deliveryDate = (() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toDateString();
  })();

  /* CHECKOUT */

  const handleCheckout = () => {

    if (selectedItems.length === 0) {
      alert("Select at least one product");
      return;
    }

    const orders = selectedItems.map((index) => ({
      ...cart[index],
      orderId: "ORD-" + Date.now() + "-" + index,
      orderDate: new Date().toLocaleString(),
    }));

    navigate("/address-select", {
      state: {
        orders,
        total
      }
    });

  };

  /* CLEAR COUPON IF CART EMPTY */

  useEffect(() => {

    if (cart.length === 0) {

      localStorage.removeItem("coupon");
      localStorage.removeItem("discount");
      localStorage.removeItem("discountPercent");
      localStorage.removeItem("couponApplied");

    }

  }, [cart]);

  /* EMPTY CART */

  if (cart.length === 0) {

    return (
      <center style={{ marginTop: "80px" }}>
        <h3>Your cart is empty</h3>
      </center>
    );

  }

  return (

    <div className="cart-wrapper">

      <div className="cart-layout">

        {/* LEFT SIDE */}

        <div className="cart-left-box">

          {cart.map((item, index) => (

            <div key={index} className="cart-item-row">

              <input
                type="checkbox"
                checked={selectedItems.includes(index)}
                onChange={() => handleSelect(index)}
              />

              <img
                src={item.image}
                alt={item.name}
                className="cart-image"
                onClick={() =>
                  navigate(`/product/${item.category}/${item.id}`)
                }
              />

              <div className="cart-details">

                <h4
                  className="product-name"
                  onClick={() =>
                    navigate(`/product/${item.category}/${item.id}`)
                  }
                >
                  {item.name}
                </h4>

                <p>₹{item.price}</p>

                <p className="delivery-date">
                  Delivery by <b>{deliveryDate}</b>
                </p>

                <div className="qty-box">

                  <button onClick={() => decreaseQuantity(index)}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(index)}>
                    +
                  </button>

                </div>

              </div>

              <i
                className="fa fa-trash trash"
                onClick={() => removeItem(index)}
              ></i>

            </div>

          ))}

        </div>

        {/* RIGHT SIDE */}

        <div className="cart-right">

          <div className="summary-box">

            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Discount ({discountPercent}%)</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>
                {finalDeliveryFee === 0
                  ? subtotal === 0
                    ? "-"
                    : "FREE"
                  : `₹${finalDeliveryFee}`}
              </span>
            </div>

            <div className="summary-row">
              <span>Tax</span>
              <span>₹{calculatedTax.toFixed(2)}</span>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

          </div>

          {/* FREE DELIVERY BAR */}

          {subtotal > 0 && (

            <div className="free-delivery-box">

              {subtotal >= FREE_DELIVERY_LIMIT ? (
                <p>🎉 You unlocked FREE Delivery!</p>
              ) : (
                <p>
                  Add ₹{remaining.toFixed(0)} more to get
                  <b> FREE Delivery</b>
                </p>
              )}

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>

              </div>

            </div>

          )}

          {/* COUPON */}

          {!couponApplied && subtotal > 0 && (

            <div className="coupon-box">

              <h4>Coupon Code</h4>

              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />

              <button onClick={applyCoupon}>
                Apply Coupon
              </button>

            </div>

          )}

          {/* CHECKOUT */}

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
          >
            Go to Checkout
          </button>

        </div>

      </div>

    </div>

  );

}

export default Cart;
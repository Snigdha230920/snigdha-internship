
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PaymentMethod from "../components/PaymentMethod";

function Checkout() {

  const navigate = useNavigate();
  const location = useLocation();
  const fromAddressSelect = location.state?.fromAddressSelect || false;

  const { cart, clearCart } = useCart();

const total = location.state?.total || 0;
  const otpSent = useRef(false); // prevent double OTP

  const [address, setAddress] = useState(
    location.state?.address || {
      name: "",
      phone: "",
      street: "",
      city: "",
      pincode: "",
    }
  );

  const [addressSaved, setAddressSaved] = useState(fromAddressSelect);
  const [otpVerified, setOtpVerified] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentValid, setPaymentValid] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const [showOtpBox, setShowOtpBox] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const addressValid =
    address.name &&
    address.phone.length === 10 &&
    address.street &&
    address.city &&
    address.pincode.length === 6;

  const handleChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  /* SAVE ORDERS */

  const saveOrders = (orders, paymentType) => {

    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || !currentUser.email) {
      alert("User not logged in");
      navigate("/login");
      return;
    }

    const orderId = "ORD" + Date.now();

    const newOrders = orders.map((item) => ({
      orderId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      payment: paymentType === "COD" ? "COD" : "Payment Done",
      date: new Date().toLocaleString(),
      email: currentUser.email,
    }));

    localStorage.setItem("orders", JSON.stringify([...oldOrders, ...newOrders]));
  };

  /* AUTO OTP IF COMING FROM ADDRESS SELECT */

  useEffect(() => {

    if (fromAddressSelect && !otpSent.current) {

      otpSent.current = true;

      const dummyOtp = "0000";

      setGeneratedOtp(dummyOtp);
      setShowOtpBox(true);
      setTimer(30);

      alert("OTP: " + dummyOtp);

    }

  }, [fromAddressSelect]);

  /* SAVE ADDRESS */

  const saveAddress = () => {

    if (addressValid) {

      const oldAddresses = JSON.parse(localStorage.getItem("addresses")) || [];

      const updated = [...oldAddresses, address];

      localStorage.setItem("addresses", JSON.stringify(updated));

      setAddressSaved(true);

      const dummyOtp = "0000";

      setGeneratedOtp(dummyOtp);
      setShowOtpBox(true);
      setTimer(30);
      setEnteredOtp("");

      alert("Address Saved! OTP: " + dummyOtp);

    }

  };

  /* VERIFY OTP */

  const verifyOtp = () => {

    if (enteredOtp === generatedOtp) {

      alert("OTP Verified Successfully");

      setShowOtpBox(false);
      setOtpVerified(true);

    } else {

      alert("Wrong OTP");

    }

  };

  /* RESEND OTP */

  const resendOtp = () => {

    const newOtp = "0000";

    setGeneratedOtp(newOtp);
    setTimer(30);
    setEnteredOtp("");

    alert("OTP Resent: " + newOtp);

  };

  /* ONLINE PAYMENT SUCCESS */

  const handlePaymentSuccess = () => {

    const orderId = "ORD" + Date.now();

    localStorage.setItem(
      "latestOrder",
      JSON.stringify({
        orderId,
        amount: total,
      })
    );

    saveOrders(cart, "ONLINE");

    clearCart();

    navigate("/payment-success");

  };

  /* COD SUCCESS */

  const handleCodSuccess = () => {

    const orderId = "ORD" + Date.now();

    saveOrders(cart, "COD");

    clearCart();

    navigate("/payment-success1", { state: { orderId } });

  };

  /* OTP TIMER */

  useEffect(() => {

    let interval;

    if (timer > 0) {

      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

    }

    return () => clearInterval(interval);

  }, [timer]);

  return (

    <div className="containers">

      <h2 className="checkout-title">Secure Checkout</h2>

      {/* ADDRESS FORM */}

      {!fromAddressSelect && (

        <div className="checkout-box">

          <h5>Delivery Address</h5>

          <input
            className="form-control"
            name="name"
            placeholder="Full Name"
            value={address.name}
            onChange={handleChange}
          />

          <input
            className="form-control"
            name="phone"
            placeholder="Phone Number"
            maxLength={10}
            value={address.phone}
            onChange={handleChange}
          />

          <input
            className="form-control"
            name="street"
            placeholder="Street Address"
            value={address.street}
            onChange={handleChange}
          />

          <div className="custom-row">

            <input
              className="form-control"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
            />

            <input
              className="form-control"
              name="pincode"
              placeholder="Pincode"
              maxLength={6}
              value={address.pincode}
              onChange={handleChange}
            />

          </div>

          {!addressSaved && (

            <button
              className="btn btn-success mt-2"
              disabled={!addressValid}
              onClick={saveAddress}
            >
              Save Address & Generate OTP
            </button>

          )}

        </div>

      )}

      {/* OTP BOX */}

      {showOtpBox && (

        <div className="checkout-box">

          <h5>Enter OTP</h5>

          <input
            className="form-control"
            type="text"
            placeholder="Enter OTP"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

            <button
              className="btn btn-success"
              onClick={verifyOtp}
              disabled={timer === 0}
            >
              Verify OTP
            </button>

            <button
              className="btn-resend-otp"
              onClick={resendOtp}
              disabled={timer > 0}
            >
              Resend OTP
            </button>

          </div>

          <div className="mt-2">

            {timer > 0 ? (
              <small>OTP expires in {timer}s</small>
            ) : (
              <small>OTP expired</small>
            )}

          </div>

        </div>

      )}

      {/* PAYMENT */}

      {otpVerified && (

        <div className="checkout-box">

          <h5>Total Amount: ₹{total}</h5>

          <PaymentMethod
            method={paymentMethod}
            setMethod={setPaymentMethod}
            setPaymentValid={setPaymentValid}
            onPaymentSuccess={handlePaymentSuccess}
            onCodSuccess={handleCodSuccess}
            totalAmount={total}
            paymentCompleted={paymentCompleted}
          />

        </div>

      )}

    </div>

  );

}

export default Checkout;


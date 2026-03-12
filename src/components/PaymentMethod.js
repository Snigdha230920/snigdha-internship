import React, { useEffect } from "react";
import { FaCreditCard, FaTruck } from "react-icons/fa";

function PaymentMethod({
  method,
  setMethod,
  setPaymentValid,
  onPaymentSuccess = () => {},
  onCodSuccess = () => {},
  totalAmount,
  paymentCompleted = false
}) {
  useEffect(() => {
    if (!method) {
      setPaymentValid(false);
      return;
    }
    setPaymentValid(true);
  }, [method, setPaymentValid]);

  // Razorpay integration
  const startRazorpay = () => {
    if (!window.Razorpay) {
      alert("Payment gateway not loaded");
      return;
    }

    const options = {
      key: "rzp_test_SHZXqyCPSMZR3I", // test key
      amount: totalAmount * 100,      // amount in paise
      currency: "INR",
      name: "Green Haven",
      description: "Plant Purchase",
      handler: function () {
        onPaymentSuccess(); // ✅ navigate to success page
      },
      modal: { ondismiss: () => alert("Payment cancelled") },
      theme: { color: "#2e7d32" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayNow = () => {
    if (paymentCompleted) return; // prevent re-click

    if (totalAmount <= 0) {
      alert("Cart is empty");
      return;
    }

    if (method === "COD") {
      alert("Order placed 🚚 Pay on delivery");
      onCodSuccess();
      return;
    }

    if (method === "ONLINE") {
      startRazorpay();
      return;
    }

    alert("Please select a payment method");
  };

  // Dynamic button label
  let buttonLabel = "Complete Payment";
  if (method === "ONLINE") {
    buttonLabel = paymentCompleted ? " ✅ Payment Completed" : `Pay ₹${totalAmount}`;
  } else if (method === "COD") {
    buttonLabel = "Place Order";
  }

  return (
    <div className="payment-wrapper">
      <h5 className="payment-heading">Choose Payment Method</h5>

      <div
        className={`payment-card ${method === "ONLINE" ? "active" : ""}`}
        onClick={() => setMethod("ONLINE")}
      >
        <div className="payment-content">
          <FaCreditCard className="payment-icon" />
          <div>
            <h6>Online Payment</h6>
            <p>Pay securely using UPI / Card / Netbanking</p>
          </div>
        </div>
      </div>

      <div
        className={`payment-card ${method === "COD" ? "active" : ""}`}
        onClick={() => setMethod("COD")}
      >
        <div className="payment-content">
          <FaTruck className="payment-icon" />
          <div>
            <h6>Cash on Delivery</h6>
            <p>Pay when your order arrives</p>
          </div>
        </div>
      </div>

      <button className="payment-btn" onClick={handlePayNow} disabled={paymentCompleted}>
        {buttonLabel}
      </button>
    </div>
  );
}

export default PaymentMethod;
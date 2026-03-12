import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const orderData = JSON.parse(localStorage.getItem("latestOrder"));

    const orderId = orderData?.orderId;
  const amount = orderData?.amount;
  return (
    <div className="success-wrapper">
      <div className="success-card">
        <div className="check-icon">✓</div>

        <h2>Order Successful</h2>

        <p className="order-info">
           Order #{orderId} | ₹{amount} | Visa ending in 4589
        </p>

        <p className="sub-text">
          Thank you for your payment. Your order will be processed shortly.
        </p>

        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
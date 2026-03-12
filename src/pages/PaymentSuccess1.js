import { useNavigate } from "react-router-dom";

export default function PaymentSuccess1() {
  const navigate = useNavigate();

  return (
    <div className="success-wrapper">
      <div className="success-card">
        <div className="check-icon">✓</div>

        <h2>Order Successful</h2>

        <p className="sub-text">
          Thank you for your order. Your order will be processed shortly.
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
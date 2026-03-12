import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <p className="subtitle">We’ll send a reset link to your email</p>

        <div className={`input-box ${email && "filled"}`}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>

        <button className="auth-btn">Send Reset Link</button>

        <div className="auth-footer" style={{ justifyContent: "center" }}>
          <span onClick={() => navigate("/login")}>
            Back to Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

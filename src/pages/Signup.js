import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    // ✅ Basic validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    // ✅ Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Check if email already exists
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      setError("Email already registered. Please login.");
      return;
    }

    const userData = {
      name,
      email,
      password,
      photo: ""
    };

    // ✅ Add new user to array
    users.push(userData);

    // ✅ Save all users
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup Successful!");

    navigate("/login");
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>
        <p className="subtitle">Signup to get started</p>

        {error && <small style={{ color: "red" }}>{error}</small>}

        {/* Name */}
        <div className={`input-box ${name ? "filled" : ""}`}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Full Name</label>
        </div>

        {/* Email */}
        <div className={`input-box ${email ? "filled" : ""}`}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>

        {/* Password */}
        <div className={`input-box ${password ? "filled" : ""}`}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>

        <button type="submit" className="auth-btn">
          Signup
        </button>

        <div
          className="auth-footer"
          style={{ justifyContent: "center", cursor: "pointer" }}
        >
          <span onClick={() => navigate("/login")}>
            Already have an account? Login
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
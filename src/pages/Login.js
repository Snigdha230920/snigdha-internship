
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /* CHECK IF USER ALREADY LOGGED IN */

  useEffect(() => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      navigate("/profile", { replace: true });
    }

  }, [navigate]);



  /* LOGIN FUNCTION */

  const handleLogin = (e) => {

    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
      setError("No account found. Please signup first.");
      return;
    }

    const matchedUser = users.find(
      (user) =>
        user.email === email.trim() &&
        user.password === password.trim()
    );

    if (!matchedUser) {
      setError("Invalid email or password");
      return;
    }

    /* SAVE LOGIN SESSION */

    localStorage.setItem("currentUser", JSON.stringify(matchedUser));

    navigate("/profile", { replace: true });

  };



  return (

    <div className="auth-page">

      <form className="auth-card" onSubmit={handleLogin}>

        <h2>Welcome Back</h2>
        <p className="subtitle">Login to Garden Haven</p>

        {error && (
          <small style={{ color: "red" }}>{error}</small>
        )}

        {/* EMAIL */}

        <div className={`input-box ${email ? "filled" : ""}`}>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Email</label>

        </div>


        {/* PASSWORD */}

        <div className={`input-box ${password ? "filled" : ""}`}>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Password</label>

        </div>


        {/* LOGIN BUTTON */}

        <button type="submit" className="auth-btn">
          Login
        </button>


        {/* FOOTER LINKS */}

        <div className="auth-footer">

          <span
            style={{cursor:"pointer"}}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </span>

          <span
            style={{cursor:"pointer"}}
            onClick={() => navigate("/signup")}
          >
            New user? Signup
          </span>

        </div>

      </form>

    </div>

  );

}

export default Login;


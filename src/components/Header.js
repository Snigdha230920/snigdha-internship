import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import log2 from "../images/log2.jpeg"
function Header() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
    <div className="container">

    <Link className="navbar-brand d-flex align-items-center" to="/">
  <img
    src={log2}
    alt="Green Haven Logo"
    style={{ height: "55px" }}
  />
</Link>

      {/* TOGGLER */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#nav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* NAV LINKS */}
      <div className="collapse navbar-collapse" id="nav">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <NavLink className="nav-link" to="/" end>
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/aboutus">
              About Us
            </NavLink>
          </li>

          {/* Plants Dropdown */}
          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
              Plants
            </span>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to="/plants/indoorplants">Indoor Plants</NavLink></li>
              <li><NavLink className="dropdown-item" to="/plants/outdoorplants">Outdoor Plants</NavLink></li>
              <li><NavLink className="dropdown-item" to="/plants/hangingplants">Hanging Plants</NavLink></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
              Pots
            </span>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to="/pots/ceramicpots">Ceramic pots</NavLink></li>
              <li><NavLink className="dropdown-item" to="/pots/plasticpots">Plastic pots</NavLink></li>
              <li><NavLink className="dropdown-item" to="/pots/woodenpots">Wooden pots</NavLink></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
              Seeds
            </span>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to="/seeds/fruitseeds">Fruit seeds</NavLink></li>
              <li><NavLink className="dropdown-item" to="/seeds/vegetableseeds">Vegetable seeds</NavLink></li>
              <li><NavLink className="dropdown-item" to="/seeds/flowerseeds">Flower seeds</NavLink></li>
            </ul>
          </li>

          {/* Services */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/services">
              Services
            </NavLink>
          </li>

          {/* Contact */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li>

          {/* Login */}
          <li className="nav-item">
            <button
              className="login-icon-btn"
              onClick={() => navigate("/login")}
            >
              <i className="fa fa-user"></i>
            </button>
          </li>

          {/* Cart */}
          <li className="nav-item position-relative">
            <button
              className="login-icon-btn"
              onClick={() => navigate("/cart")}
            >
              <i className="fa fa-shopping-cart"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>
          </li>

        </ul>
      </div>
    </div>
  </nav>
);

  
}

export default Header;

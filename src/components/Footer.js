import logo from "../images/log2.jpeg";

function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-main">
        <div className="footer-grid">

          {/* LOGO */}
          <div className="footer-logo">
            <img src={logo} alt="Green Haven Logo" />
          </div>

          {/* ABOUT */}
          <div className="footer-block">
            <h6>ABOUT US</h6>
            <p>Our Story</p>
            <p>Contact Us</p>
            <p>Garden Services & Maintenance</p>
          </div>

          {/* PRODUCTS */}
          <div className="footer-block">
            <h6>PRODUCTS</h6>
            <p>Plants</p>
            <p>Pots</p>
            <p>Seeds</p>
          </div>

          {/* CONTACT */}
          <div className="footer-block">
            <h6>GET IN TOUCH</h6>
            <p><i className="fa fa-envelope"></i> gardenhaven@gmail.com</p>
            <p><i className="fa fa-phone"></i> +91-8907656789</p>
            <p><i className="fa fa-map-marker"></i> Bangalore, India</p>
          </div>

          {/* SOCIAL */}
          <div className="footer-block">
            <h6>FOLLOW US ON</h6>
            <div className="footer-social">
              <i className="fa fa-instagram"></i>
              <i className="fa fa-facebook"></i>
              <i className="fa fa-twitter"></i>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        © 2026, Green Haven. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
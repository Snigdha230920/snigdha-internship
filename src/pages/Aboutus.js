import i2 from "../i2.jpeg";
import img1 from "../images/img1.jpeg";
import img2 from "../images/img2.jpeg";
import img3 from "../images/img3.jpeg";

function Aboutus() {
  return (
    <section className="about-section">
      <div className="about-container">

        {/* ABOUT TOP */}
        <div className="about-top">
          <div className="about-image">
            <img src={i2} alt="About us" />
          </div>

          <div className="about-text">
            <h2>ABOUT US</h2>
            <p>
              We create beautiful, healthy, and sustainable green spaces using
              expert gardening and modern techniques. From design to maintenance,
              we help your garden thrive while nurturing lasting beauty and
              freshness in every space.
            </p>
            <p>
              Our focus on quality, care, and sustainability ensures gardens
              that grow naturally and inspire every day.
            </p>
          </div>
        </div>

        {/* MISSION & VISION */}
        <section className="mission-vision">
          <div className="text-column">
            <div className="box">
              <h2>Our Mission</h2>
              <p>
                To create healthy, sustainable, and beautiful green spaces by
                combining expert gardening practices with eco-friendly solutions
                that bring nature closer to everyday living.
              </p>
            </div>

            <div className="box">
              <h2>Our Vision</h2>
              <p>
                To inspire a greener future where homes, workplaces, and
                communities thrive in harmony with nature through thoughtful
                design and responsible gardening.
              </p>
            </div>
          </div>

          <div className="image-column">
            <img src={img1} alt="Gardening photo" />
            <img src={img2} alt="Gardening photo" />
            <img src={img3} alt="Gardening photo" />
          </div>
        </section>

        {/* FEATURES */}
        <div className="about-features">
          <div className="feature-card">
            <i className="bi bi-truck feature-icon"></i>
            <div className="feature-text">
              <strong>Free delivery</strong>
              <span>on all orders</span>
            </div>
          </div>

          <div className="feature-card">
            <i className="bi bi-gift feature-icon"></i>
            <div className="feature-text">
              <strong>Offers and gifts</strong>
              <span>on all orders</span>
            </div>
          </div>

          <div className="feature-card">
            <i className="bi bi-credit-card feature-icon"></i>
            <div className="feature-text">
              <strong>Secure payments</strong>
              <span>protected by PayPal</span>
            </div>
          </div>

          <div className="feature-card">
            <i className="bi bi-arrow-repeat feature-icon"></i>
            <div className="feature-text">
              <strong>10 days returns</strong>
              <span>moneyback guarantee</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Aboutus;

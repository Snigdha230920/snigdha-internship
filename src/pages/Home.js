import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import plastic4 from "../images/plastic4.jpeg";
import indoor1 from "../images/indoor1.jpeg";
import green1 from "../images/green1.jpeg";
import green2 from "../images/green2.jpeg";
import gif from "../images/gif.gif";
import deals from "../images/deals.jpeg";
import video2 from "../images/video2.mp4";
import video3 from "../images/video3.mp4";


import { FaGlobeAmericas, FaUserCheck, FaSeedling, FaHeart } from "react-icons/fa";

function Home() {
const navigate = useNavigate();
const slides = [
  { type: "image", src: gif, duration: 5000 }, 
  { type: "video", src: video2 },
  { type: "video", src: video3 },
];

const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  if (slides[currentSlide].type === "image") {
    const timer = setTimeout(() => {
      nextSlide();
    }, slides[currentSlide].duration);

    return () => clearTimeout(timer);
  }
}, [currentSlide]);

const nextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % slides.length);
};

  const offers = [
    { title: "Plants", discount: "30% OFF", img: indoor1, link: "/plants/indoorplants" },
    { title: "Pots", discount: "20% OFF", img: plastic4, link: "/pots/ceramicpots" },
    { title: "Seeds", discount: "25% OFF", img: green1, link: "/seeds/fruitseeds" },
    { title: "Services", discount: "15% OFF", img: green2, link: "/services" },
  ];

  const [visibleOffers, setVisibleOffers] = useState(offers);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const slideWidth = 260;

    const interval = setInterval(() => {
      setOffset(-slideWidth);

      setTimeout(() => {
        setVisibleOffers((prev) => {
          const arr = [...prev];
          arr.push(arr.shift());
          return arr;
        });
        setOffset(0);
      }, 600);

    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="hero-section">

  {slides[currentSlide].type === "image" && (
    <img
      src={slides[currentSlide].src}
      alt="slide"
      className="hero-media"
    />
  )}

  {slides[currentSlide].type === "video" && (
    <video
      key={currentSlide}
      autoPlay
      muted
      playsInline
      onEnded={nextSlide}
      className="hero-media"
    >
      <source src={slides[currentSlide].src} type="video/mp4" />
    </video>
  )}

  <div className="hero-content">
    <h1 className="home-title">
      <i>“Bringing Life to Every Corner”</i>
    </h1>

    <p className="home-page">
      Inspired by nature and built with care, helping you grow lush,
      sustainable gardens that flourish naturally.
    </p>

    <button
      className="shop-btn"
      onClick={() => navigate("/plants/indoorplants")}
    >
      Shop Now
    </button>
  </div>

  <div className="hero-dots">
    {slides.map((_, index) => (
      <span
        key={index}
        className={index === currentSlide ? "dot active" : "dot"}
        onClick={() => setCurrentSlide(index)}
      />
    ))}
  </div>

</section>

      <section className="why-section">
        <div className="container">
          <h1>Why Choose Us?</h1>

          <p className="why-text">
            We’re a gardening company focused on making green living easy for every home.
            From quality plants to smart gardening solutions, we help homes grow
            happier spaces with nature at the center.We make green living simple and accessible for every home. With high-quality plants, stylish pots, and smart gardening solutions, we help you create healthier and happier spaces.Whether you're a beginner or a plant lover, we make gardening easy and enjoyable.
          </p>

          <div className="why-grid">
            <div className="why-card"><FaGlobeAmericas className="why-icon" /><p>Eco-Friendly</p></div>
            <div className="why-card"><FaUserCheck className="why-icon" /><p>Expert Care</p></div>
            <div className="why-card"><FaSeedling className="why-icon" /><p>Plant Care Support</p></div>
            <div className="why-card"><FaHeart className="why-icon" /><p>Quality Products</p></div>
          </div>
        </div>
      </section>

<section
  className="deal-banner"
  style={{
    backgroundImage: `url(${deals})`,
  }}
>
  <div className="deal-content">
    <div className="deal-row">
      <div>
        <p className="deal-small">LIMITED TIME OFFER</p>

        <h1 className="deal-title">Green Deals</h1>

        <p className="deal-sub">
          Upto <strong>40% OFF</strong> on Pots & Plants
        </p>

        <button
          className="deal-btn"
          onClick={() => navigate("/plants/indoorplants")}
        >
          Shop Now
        </button>
      </div>
    </div>
  </div>
</section>

      {/* ================= OFFER CAROUSEL ================= */}
      <section className="offer-section">
        <h2 className="offer-title">What We Offer?</h2>

        <div className="offer-wrapper">
          <div
            className="offer-track"
            style={{
              transform: `translateX(${offset}px)`,
              transition: offset === 0 ? "none" : "transform 0.6s ease",
            }}
          >
            {visibleOffers.map((offer, index) => (
              <Link to={offer.link} key={index} className="offer-item">
                <div className="offer-card">
                  <img src={offer.img} alt={offer.title} />
                  <div className="overlay">
                    <h3>{offer.title}</h3>
                    <p>Upto <b>{offer.discount}</b></p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
       <section className="testimonial-section">
      <h2>What Our Customers Say?</h2>

      <div className="testimonial-container">

        {/* Card 1 */}
        <div className="testimonial-card">
          <div className="top-row">
            <div className="stars">★★★★★</div>
            <i className="fa fa-user-circle-o user-icon" aria-hidden="true"></i>
          </div>

          <p className="title">“My balcony finally feels alive!”</p>
          <p className="text">
            The plants arrived fresh and healthy, and the care tips really helped me maintain them easily.
          </p>

          <div className="user-info">
            <span className="name">~ Ananya R</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="testimonial-card">
          <div className="top-row">
            <div className="stars">★★★★★</div>
            <i className="fa fa-user-circle-o user-icon" aria-hidden="true"></i>
          </div>

          <p className="title">“Beautiful quality & great service.”</p>
          <p className="text">
            The pots and plants look amazing in my home. Definitely my go-to place for greenery.
          </p>

          <div className="user-info">
            <span className="name">~ Sneha M</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="testimonial-card">
          <div className="top-row">
            <div className="stars">★★★★★</div>
            <i className="fa fa-user-circle-o user-icon" aria-hidden="true"></i>
          </div>

          <p className="title">“Perfect for home gardens.”</p>
          <p className="text">
            I’m new to gardening, but the care tips made it super easy to maintain my plants.
          </p>

          <div className="user-info">
            <span className="name">~ Arjun K</span>
          </div>
        </div>

      </div>
    </section>
    </>
  );
}

export default Home;
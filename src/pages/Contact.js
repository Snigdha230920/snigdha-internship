import React, { useState } from "react";
import leafs from "../images/leafs.jpeg";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent double click
    setLoading(true);

    const templateParams = {
      username: formData.username,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      date_time: new Date().toLocaleString(),
    };

    try {
      // 🔵 Send mail to ADMIN
      await emailjs.send(
        "service_arzpqeu",
        "template_xll89va", // ADMIN TEMPLATE
        templateParams,
        "WSomyCQc3pwU9Jw6v"
      );

      // 🔵 Send confirmation to CUSTOMER
      await emailjs.send(
        "service_arzpqeu",
        "template_thblmzf", // CUSTOMER TEMPLATE
        templateParams,
        "WSomyCQc3pwU9Jw6v"
      );

      alert("Message Sent Successfully 🌿");

      setFormData({
        username: "",
        phone: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send ❌");
    }

    setLoading(false);
  };

  return (
    <section
      className="contact-section"
      style={{ backgroundImage: `url(${leafs})` }}
    >
      <div className="contact-container">

        {/* LEFT SIDE */}
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            Not sure what you need? <br />
            We will be happy to listen to you <br />
            and suggest ideas you hadn’t considered.
          </p>

          <ul>
            <li>
              <i className="fa fa-envelope"></i>
              <span> greenhaven@gmail.com</span>
            </li>
            <li>
              <i className="fa fa-phone"></i>
              <span> +91-8907656789</span>
            </li>
            <li>
              <i className="fa fa-map-marker"></i>
              <span> Bangalore, India</span>
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>

            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group full">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn-send"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;
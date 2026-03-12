import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showPhoto, setShowPhoto] = useState(false);

  const navigateToContact = () => navigate("/contact");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = allOrders.filter(order => order.email === storedUser.email);
    setOrders(userOrders.reverse());
  }, [navigate]);

  // Save Profile Changes
  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(u => (u.email === user.email ? user : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(user));
    setEditing(false);
    alert("Profile Updated Successfully");
  };

  // Update Password
  const handlePasswordUpdate = () => {
    if (currentPassword !== user.password) {
      alert("Current password incorrect");
      return;
    }
    if (!newPassword) {
      alert("Enter new password");
      return;
    }
    const updatedUser = { ...user, password: newPassword };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(u => (u.email === user.email ? updatedUser : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setCurrentPassword("");
    setNewPassword("");
    alert("Password Updated Successfully");
  };

  // Change Photo
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, photo: reader.result };
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map(u => (u.email === user.email ? updatedUser : u));
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
    };
    reader.readAsDataURL(file);
  };

  // Remove Photo
  const removePhoto = () => {
    const updatedUser = { ...user, photo: "" };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(u => (u.email === user.email ? updatedUser : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowPhoto(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">

      {/* PROFILE CARD */}
      <div className="profile-card">
        <h2>My Profile</h2>
        <p className="profile-subtitle">Manage your personal information and security</p>

        {/* PROFILE IMAGE */}
        <div className="profile-image-wrapper">
          <img
            src={user.photo || "https://via.placeholder.com/120"}
            alt="profile"
            className="profile-image"
            onClick={() => setShowPhoto(true)}
          />
          <div className="camera-icon" onClick={() => fileInputRef.current.click()}>
            <i className="fa fa-camera"></i>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* INFO */}
        <div className="info-section">
          <label>FULL NAME</label>
          <input
            type="text"
            value={user.name}
            disabled={!editing}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <label>EMAIL ADDRESS</label>
          <input
            type="email"
            value={user.email}
            disabled={!editing}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        {!editing ? (
          <button className="edit-profile-btn" onClick={() => setEditing(true)}>Edit Profile</button>
        ) : (
          <button className="edit-profile-btn" onClick={handleSave}>Save Changes</button>
        )}

        {/* SECURITY */}
        <div className="security-section">
          <h3>Security</h3>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="update-password-btn" onClick={handlePasswordUpdate}>
            Update Password
          </button>
        </div>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* ORDERS */}
      <div className="orders-card">
        <h2 className="orders-title">Recent Orders</h2>
        <div className="orders-list">
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            orders.map((order, index) => (
              <div key={index} className="order-box">
                <div className="order-left">
                  <img src={order.image} alt={order.name} className="order-image" />
                </div>
                <div className="order-center">
                  <h4 className="order-name">{order.name}</h4>
                  <p className="order-id">Order #{order.orderId || "N/A"}</p>
                  <small className="order-date">{order.date}</small>
                  <h5 className="order-price">₹{order.price}</h5>
                </div>
                <div className="order-right">
                  <span className={order.payment === "COD" ? "payment-badge cod" : "payment-badge paid"}>
                    {order.payment}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="order-footer">
          Need help with an order? <span onClick={navigateToContact}>Contact Us</span>
        </div>
      </div>

      {/* PHOTO VIEWER WITH BOTTOM ACTIONS */}
      {showPhoto && (
        <div className="photo-modal-overlay" onClick={() => setShowPhoto(false)}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={user.photo || "https://via.placeholder.com/300"} alt="profile" className="zoom-photo" />
            <div className="photo-modal-actions">
              <button onClick={() => { fileInputRef.current.click(); setShowPhoto(false); }}>
                Change Photo
              </button>
              <button onClick={removePhoto}>Remove Photo</button>
              <button onClick={() => setShowPhoto(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
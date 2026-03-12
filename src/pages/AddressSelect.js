
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AddressSelect() {

  const navigate = useNavigate();
  const location = useLocation();

  /* ORDERS FROM CART */
  const orders = location.state?.orders || [];

  const [addresses, setAddresses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editAddress, setEditAddress] = useState({});

  /* LOAD ADDRESSES */

  useEffect(() => {

    const saved = JSON.parse(localStorage.getItem("addresses")) || [];

    setAddresses(saved);

  }, []);

  /* CONTINUE CHECKOUT */

  const continueCheckout = () => {

    if (selectedIndex === null) {
      alert("Please select an address");
      return;
    }

    const selectedAddress = addresses[selectedIndex];

navigate("/checkout", {
  state: {
    orders,
    address: selectedAddress,
    fromAddressSelect: true,
    total: location.state?.total
  }
});

  };

  /* DELETE ADDRESS */

  const deleteAddress = (index) => {

    const updated = addresses.filter((_, i) => i !== index);

    setAddresses(updated);

    localStorage.setItem("addresses", JSON.stringify(updated));

  };

  /* START EDIT */

  const startEdit = (index) => {

    setEditingIndex(index);
    setEditAddress(addresses[index]);

  };

  /* HANDLE INPUT CHANGE */

  const handleChange = (e) => {

    setEditAddress({
      ...editAddress,
      [e.target.name]: e.target.value,
    });

  };

  /* SAVE EDIT */

  const saveEdit = () => {

    const updated = [...addresses];

    updated[editingIndex] = editAddress;

    setAddresses(updated);

    localStorage.setItem("addresses", JSON.stringify(updated));

    setEditingIndex(null);

  };

  /* ADD NEW ADDRESS */

  const addNewAddress = () => {

    navigate("/checkout", { state: { orders } });

  };

  return (

    <div className="containers">

      <div className="address-header">

        <h3>Select Delivery Address</h3>

     <button
  className="btn"
  onClick={addNewAddress}
  style={{
    border: "2px solid green",
    background: "transparent",
    color: "green"
  }}
>
  Add New Address
</button>

      </div>

      {addresses.length === 0 && (
        <p>No saved addresses</p>
      )}

      {addresses.map((addr, index) => (

        <div key={index} className="checkout-box address-row">

          {/* RADIO BUTTON */}

          <input
            type="radio"
            name="address"
            checked={selectedIndex === index}
            onChange={() => setSelectedIndex(index)}
          />

          {/* ADDRESS CONTENT */}

          <div className="address-content">

            {editingIndex === index ? (

              <>
                <input
                  name="name"
                  value={editAddress.name}
                  onChange={handleChange}
                  className="form-control"
                />

                <input
                  name="phone"
                  value={editAddress.phone}
                  onChange={handleChange}
                  className="form-control"
                />

                <input
                  name="street"
                  value={editAddress.street}
                  onChange={handleChange}
                  className="form-control"
                />

                <input
                  name="city"
                  value={editAddress.city}
                  onChange={handleChange}
                  className="form-control"
                />

                <input
                  name="pincode"
                  value={editAddress.pincode}
                  onChange={handleChange}
                  className="form-control"
                />

                <button
                  className="btn btn-success mt-2"
                  onClick={saveEdit}
                >
                  Save
                </button>
              </>

            ) : (

              <>
                <p><b>{addr.name}</b></p>
                <p>{addr.phone}</p>
                <p>{addr.street}</p>
                <p>{addr.city} - {addr.pincode}</p>

                <button
                  className="btn-edit"
                  onClick={() => startEdit(index)}
                >
                  Edit
                </button>
              </>

            )}

          </div>

          {/* DELETE */}

          <i
            className="fa fa-trash"
            style={{ cursor: "pointer", color: "green" }}
            onClick={() => deleteAddress(index)}
          ></i>

        </div>

      ))}

      <button
        className="btn btn-success mt-3"
        onClick={continueCheckout}
      >
        Proceed to Pay
      </button>

    </div>

  );

}

export default AddressSelect;


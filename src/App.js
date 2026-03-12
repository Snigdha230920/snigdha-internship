import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import IndoorPlants from "./pages/Indoorplants";
import OutdoorPlants from "./pages/Outdoorplants";
import HangingPlants from "./pages/Hangingplants";
import Ceramicpots from "./pages/Ceramicpots";
import Plasticpots from "./pages/Plasticpots";
import Woodenpots from "./pages/Woodenpots";
import Fruitseeds from "./pages/Fruitseeds";
import Vegetableseeds from "./pages/vegetableseeds";
import Flowerseeds from "./pages/Flowerseeds";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import  Profile from "./pages/Profile";
import  AddressSelect from "./pages/AddressSelect";




import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentSuccess1 from "./pages/PaymentSuccess1";

import PaymentMethod from "./components/PaymentMethod";
import AdvancedChatBot from "./components/AdvancedChatBot";


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-success1" element={<PaymentSuccess1 />} />

          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/address-select" element={<AddressSelect />} />

           <Route
  path="/profile"
  element={
    localStorage.getItem("currentUser") ? (
      <Profile />
    ) : (
      <Navigate to="/login" />
    )
  }
/>


          <Route path="/plants/indoorplants" element={<IndoorPlants />} />
          <Route path="/plants/outdoorplants" element={<OutdoorPlants />} />
          <Route path="/plants/hangingplants" element={<HangingPlants />} />

          <Route path="/pots/ceramicpots" element={<Ceramicpots />} />
          <Route path="/pots/plasticpots" element={<Plasticpots />} />
          <Route path="/pots/woodenpots" element={<Woodenpots />} />

          <Route path="/seeds/fruitseeds" element={<Fruitseeds />} />
          <Route path="/seeds/vegetableseeds" element={<Vegetableseeds />} />
          <Route path="/seeds/flowerseeds" element={<Flowerseeds />} />
         
          

        </Routes>

        <Footer />
      <AdvancedChatBot />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

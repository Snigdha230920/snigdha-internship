import hanging1 from "../images/hanging1.jpeg";
import hanging2 from "../images/hanging2.jpeg";
import hanging3 from "../images/hanging3.jpeg";
import hanging4 from "../images/hanging4.jpeg";
import { useCart } from "../context/CartContext";



function Hangingplants() {
    const { addToCart } = useCart();

   return (
  <div className="container my-5"> 
    <h2>Hanging plants</h2>

    <div className="row">
      {[
        ["Money Plant", 500, hanging1],
        ["curtain creeper", 50, hanging2],
        ["Turtle Vine", 50, hanging3],
        ["Money Plant Variegated", 50, hanging4],
      ].map(([name, price, img]) => (
        <div className="col" key={name}>
          <div className="card">
            <img src={img} className="card-img-top" alt={name} />
            <div className="card-body text-center">
              <h5>{name}</h5>
              <p>₹{price}</p>
                <button
                  className="btn btn-success"
                 onClick={() =>
  addToCart({
    id: name + price,   // id add pannu
    name: name,
    price: price,
    image: img    
                    })
                  }
                >
                  Add to cart
                </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Hangingplants;
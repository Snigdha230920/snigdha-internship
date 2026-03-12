import flower1 from "../images/flower1.jpeg";
import flower2 from "../images/flower2.jpeg";
import flower3 from "../images/flower3.jpeg";
import flower4 from "../images/flower4.jpeg";
import { useCart } from "../context/CartContext";

function Flowerseeds() {
  const { addToCart } = useCart();

  return (
    <div className="container my-5">
      <h2>Flower seeds</h2>

      <div className="row">
        {[
          ["Stock Mixed", 500, flower1],
          ["Colcus Rainbow", 50, flower2],
          ["Phlox Beauty Dwarf", 50, flower3],
          ["Marigold Mixed", 50, flower4],
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

export default Flowerseeds;

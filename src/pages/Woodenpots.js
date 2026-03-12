import wooden1 from "../images/wooden1.jpeg";
import wooden2 from "../images/wooden2.jpeg";
import wooden3 from "../images/wooden3.jpeg";
import wooden4 from "../images/wooden4.jpeg";
import { useCart } from "../context/CartContext";
 


function Woodenpots(){
      const { addToCart } = useCart();   
     
       return (
         <div className="container my-5"> 
              <h2>Wooden pots</h2>
          
              <div className="row">
                {[
                  ["white Pot", 500, wooden1],
                  ["Round Pot", 50, wooden2],
                  ["Round Pot", 50, wooden3],
                  ["Round Pot", 50, wooden4],
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
  export default Woodenpots;
  

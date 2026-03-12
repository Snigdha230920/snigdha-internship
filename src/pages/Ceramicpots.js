import ceramic1 from "../images/ceramic1.jpeg";
import ceramic2 from "../images/ceramic2.jpeg";
import ceramic3 from "../images/ceramic3.jpeg";
import ceramic4 from "../images/ceramic4.jpeg";
import { useCart } from "../context/CartContext";

function Ceramicpots() {

  const { addToCart } = useCart();   

  return (
    <div className="container my-5"> 
         <h2>Ceramic pots</h2>
     
         <div className="row">
           {[
             ["white Pot", 500, ceramic1],
             ["Round Pot", 50, ceramic2],
             ["Round Pot", 50, ceramic3],
             ["Round Pot", 50, ceramic4],
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
export default Ceramicpots;

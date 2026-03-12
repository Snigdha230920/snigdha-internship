import indoor1 from "../images/indoor1.jpeg";
import indoor2 from "../images/indoor2.jpeg";
import indoor3 from "../images/indoor3.jpeg";
import indoor4 from "../images/indoor4.jpeg";
import { useCart } from "../context/CartContext";

function Indoorplants() {
  const { addToCart } = useCart();

  return (
    <div className="container my-5"> 
         <h2>Indoor plants</h2>
     
         <div className="row">
           {[
             ["Peace Lily", 500, indoor1],
             ["Monstera Obliqua", 50, indoor2],
             ["Jade Mini Plant", 50, indoor3],
             ["Aglaonema Red Plant", 50, indoor4],
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
export default Indoorplants;

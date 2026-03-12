import outdoor1 from "../images/outdoor1.jpeg";
import outdoor2 from "../images/outdoor2.jpeg";
import outdoor3 from "../images/outdoor3.jpeg";
import outdoor4 from "../images/outdoor4.jpeg";
import { useCart } from "../context/CartContext";

function OutdoorPlants() {
 const { addToCart } = useCart();
 
    return (
   <div className="container my-5"> 
     <h2>Outdoor plants</h2>
 
     <div className="row">
       {[
         ["China Plant", 500, outdoor1],
         ["Watermelon Peperomia", 50, outdoor2],
         ["petra Croton", 50, outdoor3],
         ["Purple Lavender Flower Tree", 50, outdoor4],
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

export default OutdoorPlants;
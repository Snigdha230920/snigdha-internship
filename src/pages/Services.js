import services1 from "../images/services1.jpeg";
import services2 from "../images/services2.jpeg";
import services3 from "../images/services3.jpeg";
import { useCart } from "../context/CartContext";



function Services() {
       const { addToCart } = useCart();   
          
           return (
              <div className="container my-5"> 
                       <h2>Services</h2>
                   
                       <div className="row">
                         {[
                           ["Lawn Care & Maintainence",4000, services1],
                           ["Planting,pruning & Maintainence", 1000, services2],
                           ["Landsscape Design & Installation", 5000, services3],
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
  export default Services;
  
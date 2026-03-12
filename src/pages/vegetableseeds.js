import vege1 from "../images/vege1.jpeg";
import vege2 from "../images/vege2.jpeg";
import vege3 from "../images/vege3.jpeg";
import vege4 from "../images/vege4.jpeg";
import { useCart } from "../context/CartContext";



function Vegetableseeds(){
     const { addToCart } = useCart();   
    
     return (
        <div className="container my-5"> 
                 <h2>Vegetable seeds</h2>
             
                 <div className="row">
                   {[
                     ["Zucchini", 500, vege1],
                     ["Corn", 50, vege2],
                     ["Beetroot Candy", 50, vege3],
                     ["Capsicum", 50, vege4],
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
  export default Vegetableseeds;
  

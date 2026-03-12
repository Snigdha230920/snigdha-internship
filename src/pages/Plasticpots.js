import plastic1 from "../images/plastic1.jpeg";
import plastic2 from "../images/plastic2.jpeg";
import plastic3 from "../images/plastic3.jpeg";
import plastic4 from "../images/plastic4.jpeg";
import { useCart } from "../context/CartContext";



function Plasticpots(){

     const { addToCart } = useCart();   
    
      return (
        <div className="container my-5"> 
             <h2>Plastic pots</h2>
         
             <div className="row">
               {[
                 ["white Pot", 500, plastic1],
                 ["Round Pot", 50, plastic2],
                 ["Round Pot", 50, plastic3],
                 ["Round Pot", 50, plastic4],
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
  
  export default Plasticpots;
  

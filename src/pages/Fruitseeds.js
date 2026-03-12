import fruit1 from "../images/fruit1.jpeg";
import fruit2 from "../images/fruit2.jpeg";
import fruit3 from "../images/fruit3.jpeg";
import fruit4 from "../images/fruit4.jpeg";
import { useCart } from "../context/CartContext";



function Fruitseeds(){
      const { addToCart } = useCart();   
     
       return (
         <div className="container my-5"> 
              <h2>Fruit seeds</h2>
          
              <div className="row">
                {[
                  ["Strawberry", 500, fruit1],
                  ["Papaya", 50, fruit2],
                  ["Watermelon", 50, fruit3],
                  ["Watermelon", 50, fruit4],
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
  export default Fruitseeds;
  

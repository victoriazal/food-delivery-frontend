import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import closeBtn from "../../assets/images/close.png"
import promocodeImg from '../../assets/images/promo_code.png'
import './cart.scss'
const Cart = () => {
  type cartDataObj = {
    id: number;
    image: string;
    name: string;
    shortDescription: string;
    price: string;
  }
  const dish: cartDataObj[] = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      <div className="orderItem-header">
        <h2>My Order</h2>
        <button><img src={closeBtn} alt="close" /></button>
      </div>
      {dish.map((item) => (
        <div className="orderItem-container">
          <div className="orderItem" key={item.id}>
            <img className="orderItem_image" src={`http://localhost:5000/dish/${item.image}`} alt={item.name} />
            <div className="orderItem_info">
              <h3>{item.name}</h3>
              <p>{item.shortDescription}</p>
              <h4>
                $<span>{item.price}</span>
              </h4>
            </div>
            <div className="orderItem_dish-count">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </div>
        </div>
      ))}
      <div className="promocode-container">
        <input placeholder="Promo code..."></input>
        <img alt="promo code" src={promocodeImg} />
        <button>Apply</button>
      </div>
      <div className="total">
        <p>Subtotal</p>   
        <p>Delivery</p>
        <h3>Total</h3> 
      </div>
      <button>CONFIRM ORDER</button>
    </div>
  )
}

export default Cart;

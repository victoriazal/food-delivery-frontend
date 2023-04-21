import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import closeBtn from "../../assets/images/close.png"
import promocodeImg from '../../assets/images/promo_code.png'
import './cart.scss'
import { useNavigate } from "react-router-dom";
import { useState } from "react";



const Cart = () => {
  type cartDataObj = {
    id: number;
    image: string;
    name: string;
    shortDescription: string;
    price: string;
  }
  const dish: cartDataObj[] = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate()


  // change amount of the dishes in the cart
  const [amounts, setAmounts] = useState<{ [id: number]: number }>(
    dish.reduce<{ [id: number]: number }>((result, item) => {
      result[item.id] = 1; // set initial amount to 1
      return result;
    }, {})
  );

  const changeQuantity = (id: number, value: number) => {
    setAmounts((prevAmounts) => {
      const newAmounts = { ...prevAmounts };
      newAmounts[id] = Math.max(newAmounts[id] + value, 0); // don't allow negative amount
      return newAmounts;
    });
  };

  // counting the price of an order - if subtotal price is less then 10$ delivery costs 2.99$ 
  let subTotalPrice = dish.map((item) => Number(item.price) * amounts[item.id]).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2);
  let deliveryPrice = Number(subTotalPrice) > 10 ? 0 : 2.99
  let totalPrice = subTotalPrice !== '0.00' ? (Number(subTotalPrice) + deliveryPrice).toFixed(2) : '0.00';
  // rendering choosed items in the cart
  const choosedDishes = dish.map((item) => {
    if (amounts[item.id] > 0) {
      return (
        <div key={item.price} className="orderItem" >
          <img className="orderItem_image" src={`http://localhost:5000/dish/${item.image}`} alt={item.name} />
          <div className="orderItem_info">
            <h3>{item.name}</h3>
            <p>{item.shortDescription}</p>
            <h4>
              $<span>{Number(item.price) * amounts[item.id]}</span>
            </h4>
          </div>
          <div className="orderItem_dish-count">
            <button type="button" onClick={() => changeQuantity(item.id, -1)}>-</button>
            <span>{amounts[item.id]}</span>
            <button type="button" onClick={() => changeQuantity(item.id, +1)}>+</button>
          </div>
        </div>)
    }
    else {
      return true
    }
  }
  )

  return (
    <div className="wrapper">
      <div className="orderItem-header">
        <h2>My Order</h2>
        <button type="button" onClick={() => { navigate(-1) }} ><img src={closeBtn} alt="close" /></button>
      </div>
      <div className="orderItem-container">
        {choosedDishes}
      </div>
      <div className="proba">
        <div className="promocode-container">
          <input placeholder="Promo code..."></input>
          <img alt="promo code" src={promocodeImg} />
          <button>Apply</button>
        </div>
        <div className="total">
          <div>
            <p>Subtotal</p>
            <span>${subTotalPrice}</span>
          </div>
          <hr></hr>
          <div>
            <p>Delivery</p>
            <span>${deliveryPrice}</span>
          </div>
          <hr></hr>
          <div>
            <h3>Total</h3>
            <h4>${totalPrice}</h4>
          </div>
        </div>
        <div className="confirm-order-btn">
          <button >CONFIRM ORDER</button>
        </div>
      </div>
    </div>
  )
}

export default Cart;

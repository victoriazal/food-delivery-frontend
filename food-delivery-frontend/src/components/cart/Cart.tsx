import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import closeBtn from "../../assets/images/close.png"
import promocodeImg from '../../assets/images/promo_code.png'
import './cart.scss'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFavoriteDishesAndCart } from "../../assets/hooks/favoriteDishesAndCartHook";
const Cart = () => {
  type cartDataObj = {
    id: number;
    image: string;
    name: string;
    shortDescription: string;
    price: string;
  }
  const { handleRemoveItem } = useFavoriteDishesAndCart()
  const navigate = useNavigate()

  const [cart, setCart] = useState<cartDataObj[]>([]);
  const dishes: cartDataObj[] = useSelector((state: RootState) => state.cart.items);
  
  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, [dishes]);

  // change amount of the dishes in the cart
  const [amounts, setAmounts] = useState<{ [id: number]: number }>(
    dishes.reduce<{ [id: number]: number }>((result, item) => {
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
  let subTotalPrice = cart.map((item) => Number(item.price) * amounts[item.id]).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2);
  let deliveryPrice = Number(subTotalPrice) > 10 ? 0 : 2.99
  let totalPrice = subTotalPrice !== '0.00' ? (Number(subTotalPrice) + deliveryPrice).toFixed(2) : '0.00';
  // rendering choosed items in the cart
  const choosedDishes =
    cart.map((item) => {
      if (amounts[item.id] === 0) {
        handleRemoveItem(item.id)
        localStorage.setItem('cart', JSON.stringify(cart));
      }
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
    )
  return (
    <div className="wrapper">
      <div className="orderItem-header">
        <h2>My Order</h2>
        <button type="button" onClick={() => { navigate(-1) }} ><img src={closeBtn} alt="close" /></button>
      </div>
      <div className="orderItem-container">
        {choosedDishes.length > 0 ? choosedDishes : <span className="orderItem-container_no-orders">No items in the cart yet</span>}
      </div>
      <div className="promocode-wrapper">
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
          <button onClick={()=>navigate('/notifications')} >CONFIRM ORDER</button>
        </div>
      </div>
    </div>
  )
}

export default Cart;

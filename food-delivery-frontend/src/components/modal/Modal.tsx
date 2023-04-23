import { FC, useState } from 'react';
import unlikedBtn from '../../assets/images/menu-icons/ic_favorite_unselected.png';
import starIcon from '../../assets/images/star.png';
import timeIcon from '../../assets/images/time.png';
import likedBtn from '../../assets/images/menu-icons/ic_favorite_selected.png';
import './modal.scss'
import { Dish } from '../home/Home';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useFavoriteDishesAndCart } from '../../assets/hooks/favoriteDishesAndCartHook';

interface ModalDishProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDish: Dish | null;
}
const ModalDish: FC<ModalDishProps> = ({ active, setActive, selectedDish }) => {


  type cartDataObj = {
    id: number;
    image: string;
    name: string;
    shortDescription: string;
    price: string;
  }
  const dish: cartDataObj[] = useSelector((state: RootState) => state.cart.items);
  const [amounts, setAmounts] = useState<{ [id: number]: number }>(
    dish.reduce<{ [id: number]: number }>((result, item) => {
      result[item.id] = 1;
      return result;
    }, {})
  );

  const changeQuantity = (id: number, value: number) => {
    setAmounts((prevAmounts) => {
      const newAmounts = { ...prevAmounts };
      newAmounts[id] = Math.max(newAmounts[id] + value, 0);
      return newAmounts;
    });
  };

  // import hooks
  const {handleLike,handleAddToCart,cart,favoriteDishes} = useFavoriteDishesAndCart()
  return (

    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className={active ? "modal_content active" : "modal_content"} onClick={e => e.stopPropagation()}>
        <img className="modal_content_dish-image" src={selectedDish ? `http://localhost:5000/dish/${selectedDish?.image}` : starIcon} alt='ok' />
        <button onClick={()=>(selectedDish)?handleLike(selectedDish): console.log("can't add to favorite")} className="modal_content_dish-image_like-btn" >
          <img className="like-btn-img"  src={favoriteDishes.some((favDish) => favDish.id === selectedDish?.id) ? likedBtn : unlikedBtn} alt="like button" />
        </button>
        <div className='modal_content_dish-info'>
          <div className='modal_content_dish-info_header'>
            <div>
              <h4>{selectedDish?.name}</h4>
              <h5>{selectedDish?.shortDescription}</h5>
            </div>
            <h3>
              $<span>{selectedDish?.price}</span>
            </h3>
          </div>
          <div className='modal_content_dish-info_rate-n-time'>
            <div className='modal_content_dish-info_rate'>
              <img src={starIcon} alt='star' />
              <span>{selectedDish?.rating}</span>
            </div>
            <div className='modal_content_dish-info_time'>
              <img src={timeIcon} alt='time' />
              <span>{selectedDish?.time} min</span>
            </div>
          </div>
          <div className='modal_content_dish-info_about'>
            <h4>About</h4>
            <p>{selectedDish?.about}</p>
          </div>
          <div className='modal_content_btns'>
            <div className='modal_content_btns-quantity'>
              <button type="button" onClick={() => { changeQuantity(selectedDish ? selectedDish?.id : 1, -1) }}>-</button>
              <span>{amounts[selectedDish ? selectedDish?.id : 1]}</span>
              <button type="button" onClick={() => { changeQuantity(selectedDish ? selectedDish?.id : 1, +1) }}>+</button>
            </div>
            <button disabled={cart.some((elem) => elem.id === selectedDish?.id)? true : false} onClick={() => handleAddToCart(selectedDish)}className='modal_content_btns-cart'>
            {cart.some((elem) => elem.id === selectedDish?.id) ? "Added" : "Add to cart"}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ModalDish;
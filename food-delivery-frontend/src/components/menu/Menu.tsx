import './menu.scss';
import addPhoto from '../../assets/images/photo.png';
import promotionPhoto from '../../assets/images/image_shopping_app.png';
import filterBtn from '../../assets/images/filter.png';
import searchBtn from '../../assets/images/searchBtn.png';
import unlikedBtn from '../../assets/images/menu-icons/ic_favorite_unselected.png'
import likedBtn from '../../assets/images/menu-icons/ic_favorite_selected.png'
import { useState } from 'react';
import { useFilter } from '../../assets/hooks/filterHook';
import { useFavoriteDishesAndCart } from '../../assets/hooks/favoriteDishesAndCartHook';
import { Dish } from '../home/Home';
import ModalDish from '../modal/Modal';

const Menu = () => {
  //  modal window state and logic
  const [modalActive, setModalActive] = useState(false)
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  // using hooks
  const { selectedFilters, handleFilterOption } = useFilter()
  const { favoriteDishes, handleLike, cart, handleAddToCart } = useFavoriteDishesAndCart();
  // show filter options
  const showFilterOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const filterOptionsElem = document.querySelector('.menu-page_filter-options');
    filterOptionsElem?.classList.toggle('show-options');
  };
  // combine all tags from dishes short description
  const filterOptionsArray = Array.from(new Set(favoriteDishes.flatMap(dish => dish.shortDescription.split(','))));
  const filterOptionsLi = filterOptionsArray.map(option => (
    <li key={option} className='options' onClick={(e: React.MouseEvent<HTMLLIElement>) => { handleFilterOption(option, e) }}>
      {option}
    </li>
  ))

  // search input state
  const [searchInput, setSearchInput] = useState<string[]>([]);
  const renderFavoriteDishes = favoriteDishes
    .filter(dish => {
      if (selectedFilters.length === 0) {
        return true;
      }
      return selectedFilters.some(filter => dish.shortDescription.toLowerCase().includes(filter.toLowerCase()))
    })
    .filter(dish => {
      if (searchInput.length === 0) {
        return true;
      }
      return searchInput.some(search => dish.name.toLowerCase().includes(search.toLowerCase()));
    })
    .map((dish) => {
      return (
        <div className="dish" key={dish.name}>
          <div className="dish-image-container">
            <img onClick={(e) => { setModalActive(true); setSelectedDish(dish) }} className="dish-image" src={`http://localhost:5000/dish/${dish.image}`} alt={dish.name} />
            <button onClick={() => handleLike(dish)} className="like-btn">
              <img className="like-btn-img" src={favoriteDishes.some((favDish) => favDish.id === dish.id) ? likedBtn : unlikedBtn} alt="like button" />
            </button>
          </div>
          <h4 onClick={() => { setModalActive(true); setSelectedDish(dish) }} >{dish.name}</h4>
          <span>{dish.shortDescription}</span>
          <h3>
            $<span>{dish.price}</span>
          </h3>
          <button disabled={cart.includes(dish) ? true : false} onClick={() => handleAddToCart(dish)} className="add-to-cart-btn">
            {cart.includes(dish) ? "Added" : "Add to cart"}
          </button>
        </div>)
    }
    )
  return (
    <div className='menu-page'>
      <div className='menu-page_header'>
        <h3>Let’s eat Favorite food</h3>
        <button className='profile-link' ><img alt='profile' src={addPhoto} /></button>
      </div>
      <div>
        <div className='menu-page_filter'>
          <input onChange={(e) => { setSearchInput([e.target.value]) }} type='search' placeholder='Search food...' />
          <button className='menu-page_filter-searchBtn' ><img alt="search button" src={searchBtn} /></button>
          <button onClick={(e) => { showFilterOptions(e) }} className='menu-page_filter-filterBtn'><img alt="filter button" src={filterBtn} /></button>
        </div>
        <div className='menu-page_filter-options'>
          <ul>
            {filterOptionsLi}
          </ul>
        </div>
        <div className='promotion'>
          <img alt='promotion logo' src={promotionPhoto} />
          <div>
            <h4>Free delivery</h4>
            <h5>May 10 - June 21</h5>
            <button>Order now</button>
          </div>
        </div>
      </div>
      <div className='menu-page_dishes-wrapper'>
        {renderFavoriteDishes}
      </div>
      <ModalDish active={modalActive} setActive={setModalActive} selectedDish={selectedDish} />
    </div>
  );
}

export default Menu;
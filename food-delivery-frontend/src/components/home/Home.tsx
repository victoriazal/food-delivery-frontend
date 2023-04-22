import './home.scss';
import addPhoto from '../../assets/images/photo.png';
import { useState } from 'react';
import filterBtn from '../../assets/images/filter.png';
import searchBtn from '../../assets/images/searchBtn.png';
import unlikedBtn from '../../assets/images/menu-icons/ic_favorite_unselected.png';
import likedBtn from '../../assets/images/menu-icons/ic_favorite_selected.png';
import ModalDish from '../modal/Modal';
import { useFavoriteDishesAndCart } from '../../assets/hooks/favoriteDishesAndCartHook';
import { useFilter } from '../../assets/hooks/filterHook';
export interface Dish {
  id: number;
  image: string;
  name: string;
  shortDescription: string;
  price: string;
  about: string;
  rating: string;
  time: string;
}

const Home = () => {
  // using hooks here
  const { favoriteDishes, handleLike, dishes, cart, handleAddToCart } = useFavoriteDishesAndCart();
  const {selectedFilters,handleFilterOption,showFilterOptions} = useFilter()

  //  modal window state and logic
  const [modalActive, setModalActive] = useState(false)
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  // search input state
  const [searchInput, setSearchInput] = useState<string[]>([]);
  // combine all tags from dishes short description
  const filterOptionsArray = Array.from(new Set(dishes.flatMap(dish => dish.shortDescription.split(','))));
  const filterOptionsLi = filterOptionsArray.map(option => (
    <li key={option} className='options' onClick={(e: React.MouseEvent<HTMLLIElement>) => { handleFilterOption(option, e) }}>
      {option}
    </li>
  ))
  //  rendering all the dishes
  const dishElements = dishes
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
    .map(dish => {
      return (
        <div className="dish" key={dish.name}>
          <div className="dish-image-container">
            <img onClick={(e) => { setModalActive(true); setSelectedDish(dish) }} className="dish-image" src={`http://localhost:5000/dish/${dish.image}`} alt={dish.name} />
            <button onClick={() => handleLike(dish)} className="like-btn">
              <img className="like-btn-img" src={favoriteDishes.some((favDish) => favDish.id === dish.id) ? likedBtn : unlikedBtn} alt="like button" />
            </button>
          </div>
          <h4 onClick={() => { setModalActive(true); setSelectedDish(dish) }}>{dish.name}</h4>
          <span>{dish.shortDescription}</span>
          <h3>
            $<span>{dish.price}</span>
          </h3>
          <button disabled={cart.includes(dish) ? true : false} onClick={() => handleAddToCart(dish)} className="add-to-cart-btn">
            {cart.includes(dish) ? "Added" : "Add to cart"}
          </button>
        </div>)
    });

  return (
    <div className="home-page">
      <div className="home-page_header">
        <h3>Let’s eat Quality food </h3>
        <button className="profile-link">
          <img alt="profile" src={addPhoto} />
        </button>
      </div>
      <div>
        <div className="home-page_filter">
          <input onChange={(e) => { setSearchInput([e.target.value]) }} type="search" placeholder="Search food..." />
          <button className="home-page_filter-searchBtn">
            <img alt="search button" src={searchBtn} />
          </button>
          <button onClick={showFilterOptions} className="home-page_filter-filterBtn">
            <img alt="filter button" src={filterBtn} />
          </button>
        </div>
        <div className="home-page_filter-options">
          <ul>
            {filterOptionsLi}
          </ul>
        </div>
        <div className="wrapper">{dishElements}</div>
      </div>
      <ModalDish active={modalActive} setActive={setModalActive} selectedDish={selectedDish} />
    </div>
  );
};

export default Home;

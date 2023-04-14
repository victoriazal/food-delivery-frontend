import './home.scss';
import addPhoto from '../../assets/images/photo.png';
import { instance } from '../../assets/axios';
import { useEffect, useState } from 'react';
import filterBtn from '../../assets/images/filter.png';
import searchBtn from '../../assets/images/searchBtn.png';
import unlikedBtn from '../../assets/images/menu-icons/ic_favorite_unselected.png';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slice/cart/index';

interface Dish {
  id: number;
  image: string;
  name: string;
  shortDescription: string;
  price: string;
}

const Home = () => {
  const dispatch = useDispatch();
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    instance
      .get('http://localhost:5000/dish/all')
      .then(response => {
        setDishes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleAddToCart = (dish: Dish) => {
    dispatch(addItem(dish));
  };

  const dishElements = dishes.map(dish => (
    <div className="dish" key={dish.name}>
      <div className="dish-image-container">
        <img className="dish-image" src={`http://localhost:5000/dish/${dish.image}`} alt={dish.name} />
        <button className="like-btn">
          <img className="like-btn-img" src={unlikedBtn} alt="like button" />
        </button>
      </div>
      <h4>{dish.name}</h4>
      <span>{dish.shortDescription}</span>
      <h3>
        $<span>{dish.price}</span>
      </h3>
      <button onClick={() => handleAddToCart(dish)} className="add-to-cart-btn">
        Add to Cart
      </button>
    </div>
  ));

  const showFilterOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const filterOptionsElem = document.querySelector('.home-page_filter-options');
    filterOptionsElem?.classList.toggle('show-options');
  };

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
          <input placeholder="Search food..." />
          <button className="home-page_filter-searchBtn">
            <img alt="search button" src={searchBtn} />
          </button>
          <button onClick={showFilterOptions} className="home-page_filter-filterBtn">
            <img alt="filter button" src={filterBtn} />
          </button>
        </div>
        <div className="home-page_filter-options show-options">
          <ul>
            <li>Fast food</li>
            <li>Vegetarian</li>
            <li>Fish</li>
            <li>Drink</li>
            <li>Spicy</li>
            <li>Salty</li>
            <li>Sweet</li>
            <li>Sour</li>
          </ul>
        </div>
        <div className="wrapper">{dishElements}</div>
      </div>
    </div>
  );
};

export default Home;

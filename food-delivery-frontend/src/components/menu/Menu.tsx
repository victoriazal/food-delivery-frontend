import './menu.scss';
import addPhoto from '../../assets/images/photo.png';
import promotionPhoto from '../../assets/images/image_shopping_app.png';
import filterBtn from '../../assets/images/filter.png';
import searchBtn from '../../assets/images/searchBtn.png';
import unlikedBtn from '../../assets/images/menu-icons/ic_favorite_unselected.png'
import { useEffect, useState } from 'react';
import { instance } from '../../assets/axios';

const Menu = () => {
  // show filter options
  const filterOptionsElem = document.querySelector(".menu-page_filter-options")
  const showFilterOptions = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    filterOptionsElem?.classList.contains('show-options') ? filterOptionsElem.classList.remove('show-options') : filterOptionsElem?.classList.add('show-options')
  };

  // rendering liked items
 type FavoriteDish = {
    dish:{
      id: number;
      image: string;
      name: string;
      shortDescription: string;
      price: string;
      about: string;
      rating: string;
      time: string;
    }
  } 
  const [favoriteDishes, setFavoriteDishes] = useState<FavoriteDish[]>([]);

  useEffect(() => {
    const userDataObj = JSON.parse(localStorage.getItem("user") ?? "");
  
    const fetchFavouriteDishes = async () => {
      try {
        const response = await instance.get(`http://localhost:5000/user/${userDataObj.id}/favorite-dishes`);
        setFavoriteDishes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavouriteDishes();
  }, []);
  const renderFavoriteDishes = favoriteDishes.map(({dish}) => {
    return (
      <div className="dish" key={dish.name}>
        <div className="dish-image-container">
          <img className="dish-image" src={`http://localhost:5000/dish/${dish.image}`} alt={dish.name} />
          <button  className="like-btn">
            <img className="like-btn-img" src={unlikedBtn} alt="like button" />
          </button>
        </div>
        <h4 >{dish.name}</h4>
        <span>{dish.shortDescription}</span>
        <h3>
          $<span>{dish.price}</span>
        </h3>
        <button className="add-to-cart-btn">
          Add to Cart
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
          <input placeholder='Search food...' />
          <button className='menu-page_filter-searchBtn' ><img alt="search button" src={searchBtn} /></button>
          <button onClick={(e) => { showFilterOptions(e) }} className='menu-page_filter-filterBtn'><img alt="filter button" src={filterBtn} /></button>
        </div>
        <div className='menu-page_filter-options'>
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
    </div>
  );
}

export default Menu;
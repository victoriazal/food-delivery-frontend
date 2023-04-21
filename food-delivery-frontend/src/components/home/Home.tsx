import './home.scss';
import addPhoto from '../../assets/images/photo.png';
import { instance } from '../../assets/axios';
import { useEffect, useState } from 'react';
import filterBtn from '../../assets/images/filter.png';
import searchBtn from '../../assets/images/searchBtn.png';
import unlikedBtn from '../../assets/images/menu-icons/ic_favorite_unselected.png';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/slice/cart/index';
import ModalDish from '../modal/Modal';
import { like } from '../../store/slice/favourite';
import { RootState } from '../../store/store';

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
type cartDataObj = {
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

  // retriving our cart and checking if the cart arleady has the dish in it, if not -add to the cart
  const cart: cartDataObj[] = useSelector((state: RootState) => state.cart.items);
  const handleAddToCart = (dish: Dish) => {
    if (!cart.includes(dish)) {
      dispatch(addItem(dish));
    }
  };

  // add to favourites
  const handleLike = async (liked: Dish) => {
    dispatch(like(liked));
    try {
      const userString = localStorage.getItem("user");
      if (userString !== null) {
        const user = JSON.parse(userString);
        console.log(user)
        const likedDishData = {
          userId: user.id,
          dishId: liked.id,
        };
        await instance.post<{ data: any }>('http://localhost:5000/user/like', likedDishData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  


    // combine all tags from dishes short description
    const filterOptionsArray = Array.from(new Set(dishes.flatMap(dish => dish.shortDescription.split(','))));
    const filterOptionsLi = filterOptionsArray.map(option => (
      <li key={option} className='options' onClick={(e: React.MouseEvent<HTMLLIElement>) => { handleFilterOption(option, e) }}>
        {option}
      </li>
    ))

    // render filter options
    const showFilterOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const filterOptionsElem = document.querySelector('.home-page_filter-options');
      filterOptionsElem?.classList.toggle('show-options');
    };
    // filter based on the short description
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const handleFilterOption = (filter: string, e: React.MouseEvent<HTMLLIElement>) => {
      e.currentTarget?.classList.contains('selected')
        ? setSelectedFilters(prevFilters => prevFilters.filter(option => option !== filter))
        : setSelectedFilters(prevFilters => [...prevFilters, filter]);
      e.currentTarget?.classList.toggle('selected');
    };

    //  modal window state and logic
    const [modalActive, setModalActive] = useState(false)
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
    // search input state
    const [searchInput, setSearchInput] = useState<string[]>([]);
    //  rendering all the dishes
    const dishElements = dishes
      .filter(dish => {
        if (selectedFilters.length === 0) {
          return true;
        }
        return selectedFilters.some(filter => dish.shortDescription.includes(filter))
      })
      .filter(dish => {
        if (searchInput.length === 0) {
          return true;
        }
        return searchInput.some(search => dish.name.includes(search));
      })
      .map(dish => (
        <div className="dish" key={dish.name}>
          <div className="dish-image-container">
            <img onClick={(e) => { setModalActive(true); setSelectedDish(dish) }} className="dish-image" src={`http://localhost:5000/dish/${dish.image}`} alt={dish.name} />
            <button onClick={() => handleLike(dish)} className="like-btn">
              <img className="like-btn-img" src={unlikedBtn} alt="like button" />
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
        </div>
      ));

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

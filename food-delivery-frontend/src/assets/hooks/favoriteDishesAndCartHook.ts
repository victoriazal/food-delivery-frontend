import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem, removeItem } from '../../store/slice/cart';
import { RootState } from '../../store/store';
import { instance } from '../axios';


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
export const useFavoriteDishesAndCart = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  const [favoriteDishes, setFavoriteDishes] = useState<Dish[]>([]);
  const userDataObj = JSON.parse(localStorage.getItem('user') ?? '');

  const handleLike = useCallback(async (liked: Dish) => {
    try {
      const likedDishData = {
        userId: userDataObj.id,
        dishId: liked.id,
      };
      // if we already have this dish in our favorites delete it , if not add to favorite
      favoriteDishes.some((favDish) => favDish.id === likedDishData.dishId)
        ? await instance.post<{ data: any }>('http://localhost:5000/user/dislike', likedDishData)
        : await instance.post<{ data: any }>('http://localhost:5000/user/like', likedDishData);
    } catch (error) {
      console.log(error);
    }
  }, [userDataObj.id, favoriteDishes]);

  useEffect(() => {
    const fetchFavouriteDishes = async () => {
      try {
        const response = await instance.get(`http://localhost:5000/user/${userDataObj.id}/favorite-dishes`);
        setFavoriteDishes(response.data.map((elem: { dish: Dish }) => elem.dish));
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavouriteDishes();
  }, [handleLike, userDataObj.id]);

  useEffect(() => {
    instance
      .get('http://localhost:5000/dish/all')
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [favoriteDishes]);

  // retriving our cart and checking if the cart arleady has the dish in it, if not -add to the cart
  const dispatch = useDispatch();
  const cart: cartDataObj[] = useSelector((state: RootState) => state.cart.items);
  const handleAddToCart = (dish: Dish | null) => {
    if (!dish) {
      return
    }
    if (!cart.includes(dish)) {
      dispatch(addItem(dish));

    }
  };
  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));

  };
  const navigate = useNavigate()
  const handleConfirmOrder = () => {
    localStorage.setItem('order', JSON.stringify(cart));
  
    // Choose a random courier from the couriers array
    const randomIndex = Math.floor(Math.random() * couriers.length);
    const randomCourier = couriers[randomIndex];
    setRandomCourier(randomCourier);
    localStorage.setItem('courier', JSON.stringify(randomCourier));
    navigate('/notifications');
  }


  // notifications and couriers

  // getting our couriers from database and choosing the random guy there
  type Courier = {
    id: number;
    image: string;
    name: string;
    shortDescription: string;
    price: string;
    about: string;
    rating: string;
    time: string;
  }
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [randomCourier, setRandomCourier] = useState<Courier | undefined>();
  useEffect(() => {
    instance.get<Courier[]>('http://localhost:5000/courier/all')
      .then((response) => {
        setCouriers(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }, [handleConfirmOrder]);

  // update local storage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  return { favoriteDishes, handleLike, dishes, cart, handleAddToCart, handleRemoveItem, handleConfirmOrder, couriers, randomCourier };
};

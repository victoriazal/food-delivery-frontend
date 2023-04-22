import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/slice/cart';
import { RootState } from '../../store/store';
import { instance } from '../axios';

type FavoriteDish = {
  id: number;
  image: string;
  name: string;
  shortDescription: string;
  price: string;
  about: string;
  rating: string;
  time: string;
};
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

  const [favoriteDishes, setFavoriteDishes] = useState<FavoriteDish[]>([]);
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
        setFavoriteDishes(response.data.map((elem: { dish: FavoriteDish }) => elem.dish));
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
    const handleAddToCart = (dish: Dish) => {
      if (!cart.includes(dish)) {
        dispatch(addItem(dish));
      }
    };

  return { favoriteDishes, handleLike,dishes,cart,handleAddToCart };
};

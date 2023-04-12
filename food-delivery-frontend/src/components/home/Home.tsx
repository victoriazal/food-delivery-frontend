import './home.scss'
import addPhoto from '../../assets/images/photo.png'
import { instance } from '../../assets/axios'
import {useEffect, useState } from 'react'
const Home = () => {
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    instance.get('http://localhost:5000/dish/all')
      .then(response => {
        setDishes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const dishElements = (dishes: { image: string,name:string,shortDescription:string,price:string}[]) => {
    return dishes.map((elem) => {
      return( 
                  <div className='dish' key={elem.name}>
          <div>
          <img src={elem.image} alt={elem.name} />
          <button><img src="" alt="like button"></img></button>
          </div>
          <h4>{elem.name}</h4>
          <span>{elem.shortDescription}</span>
          <h3>$ {elem.price}</h3>
          <button>Add to Cart</button>
        </div>
      );
    });
  };
  return (
    <div className='home-page'>
      <div className='home-page_header'>
      <h3>Let’s eat Quality food </h3>
      <button className='profile-link' ><img src={addPhoto}/></button>
      </div>
      <div className='home-page_filter'>
        <input placeholder='Search food'/>
        <button>filter</button>
        <div>
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
        <div className='wrapper'>
        {dishElements(dishes)}
        </div>
      </div>
    </div>
  );
}

export default Home;
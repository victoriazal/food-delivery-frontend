import './home.scss'
import addPhoto from '../../assets/images/photo.png'
const Home = () => {
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
      </div>
    </div>
  );
}

export default Home;
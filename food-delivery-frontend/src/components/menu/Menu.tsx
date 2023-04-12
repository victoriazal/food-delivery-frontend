import './menu.scss'
import addPhoto from '../../assets/images/photo.png'
import promotionPhoto from '../../assets/images/image_shopping_app.png'

const Menu = () => {
return (
    <div className='menu-page'>
      <div className='menu-page_header'>
      <h3>Let’s eat Favorite food</h3>
      <button className='profile-link' ><img src={addPhoto}/></button>
      </div>
      <div className='menu-page_filter'>
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
        <div className='promotion'>
            <img src={promotionPhoto}/>
            <div>
              <h4>Free delivery</h4>
              <h5>May 10 - June 21</h5>
              <button>Order now</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
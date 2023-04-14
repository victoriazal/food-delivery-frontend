import './menu.scss';
import addPhoto from '../../assets/images/photo.png';
import promotionPhoto from '../../assets/images/image_shopping_app.png';
import filterBtn from '../../assets/images/filter.png';
import searchBtn from '../../assets/images/searchBtn.png';
const Menu = () => {
  const filterOptionsElem = document.querySelector(".menu-page_filter-options")
  const showFilterOptions = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    
    filterOptionsElem?.classList.contains('show-options') ? filterOptionsElem.classList.remove('show-options') : filterOptionsElem?.classList.add('show-options')
  };
return (
    <div className='menu-page'>
      <div className='menu-page_header'>
      <h3>Let’s eat Favorite food</h3>
      <button className='profile-link' ><img alt='profile' src={addPhoto}/></button>
      </div>
      <div>
       <div className='menu-page_filter'>
       <input placeholder='Search food...'/>
        <button className='menu-page_filter-searchBtn' ><img alt="search button" src={searchBtn} /></button>
        <button onClick={(e) => {showFilterOptions(e)}} className='menu-page_filter-filterBtn'><img alt="filter button" src={filterBtn} /></button>
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
            <img alt='promotion logo' src={promotionPhoto}/>
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
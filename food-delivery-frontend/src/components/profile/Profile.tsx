import './profile.scss';
import addPhoto from '../../assets/images/add_a_photo.png'
import { Link, Route, Routes} from 'react-router-dom';
import History from './history/History';
import Payment from './payment/Payment';

// imports and variables for stripe
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Account from './account/Account';
import { useEffect } from 'react';
const stripePromise: Promise<Stripe | null> = loadStripe('process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!');

const Profile = () => {
  const userDataObj = JSON.parse(localStorage.getItem("user") ?? "");
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") ?? "dark";
    document.documentElement.setAttribute('data-theme', storedTheme);
    if(storedTheme==="dark" ){
      document.getElementById("darkmode-toggle")?.setAttribute("checked","checked")}
  }, []);
  
  const handleThemeToggle = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') 
    const updatedTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute('data-theme', updatedTheme);
    localStorage.setItem("theme", updatedTheme);
  };
  return (
    <div className="profile">
      <header className='profile_header'>
        <div className='toggle-theme-wrapper'>
          <h3>My Profile</h3>
          <div onClick={() => handleThemeToggle()} className='toogle-theme'>
            <input onClick={(e) => e.stopPropagation()} type="checkbox" id="darkmode-toggle"></input>
            <label htmlFor="darkmode-toggle"></label>
          </div>
        </div>
        <div className='profile_header-data'>
          <button className='profile__header-photo' ><img alt='add profile pic' src={addPhoto} /></button>
          <div>
            <h3>{userDataObj?.username}</h3>
            <h4>{userDataObj?.email}</h4>
            <h4>User ID : {userDataObj?.id}</h4>
          </div>
        </div>
        <div className='profile_header-btns'>
          <Link to="account"><button type='button'>Account</button></Link>
          <Link to="payment"><button type='button'>Payment</button></Link>
          <Link to="history"><button type='button'>History</button></Link>
        </div>
      </header>
      <div>
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path='/account' element={<Account />} />
          <Route path='/history' element={<History />} />
          <Route path='/payment' element={<Payment />} />
        </Routes>
        </Elements>
      </div>
    </div>
  );
}
export default Profile;
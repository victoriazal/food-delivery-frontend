import Profile from "../profile/Profile";
import homeIcon from "../../assets/images/menu-icons/home.png"
import notificIcon from "../../assets/images/menu-icons/bell.png"
import menuIcon from "../../assets/images/menu-icons/book.png"
import profileIcon from "../../assets/images/menu-icons/profile.png"
import shopIcon from "../../assets/images/menu-icons/shop.png"
import './menuLayout.scss'
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "../home/Home";
import Menu from "../menu/Menu";
import Notifications from "../notifications/Notifications";

// imports and variables for stripe
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise: Promise<Stripe | null> = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

const MenuLayout = () => {
  return (
    <Elements stripe={stripePromise}>
    <>
      <div>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='menu' element={<Menu />} />
          <Route path='notifications' element={<Notifications />} />
          <Route path='profile/*' element={<Profile />}/>
        </Routes>
      </div>
      <nav className="bottom-menu">
        <div className="bottom-menu_left-side">
          <ul>
            <li>
              <Link to="home"> <img src={homeIcon} alt='home' /></Link>
            </li>
            <li>
              <Link to="menu"> <img src={menuIcon} alt='home' /></Link>
            </li>
          </ul>
        </div>
        <div className="bottom-menu_center">
          <div className="circle-wrapper">
            <Link to="cart">
              <button className="bottom-menu_center-btn">
                <img src={shopIcon} alt='home' />
              </button>
            </Link>
          </div>
          <div className="bottom-menu_center-div"></div>
        </div>
        <div className="bottom-menu_right-side">
          <ul>
            <li>
              <Link to="notifications"><img src={notificIcon} alt='home' /></Link>
            </li>
            <li>
              <Link to="profile"><img src={profileIcon} alt='home' /></Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
    </Elements>
  );
}

export default MenuLayout;
import Profile from "../profile/Profile";
import homeIcon from "../../assets/images/menu-icons/home.png"
import homeIconSel from "../../assets/images/menu-icons/ic_home_selected.png"
import notificIcon from "../../assets/images/menu-icons/bell.png"
import notificationIconSel from "../../assets/images/menu-icons/ic_bell_selected.png"
import menuIcon from "../../assets/images/menu-icons/book.png"
import menuIconSel from "../../assets/images/menu-icons/ic_book_selected.png"
import profileIcon from "../../assets/images/menu-icons/profile.png"
import profileIconSel from "../../assets/images/menu-icons/ic_user_selected.png"
import shopIcon from "../../assets/images/menu-icons/shop.png"
import './menuLayout.scss'
import { Route, Routes, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "../home/Home";
import Menu from "../menu/Menu";
import Notifications from "../notifications/Notifications";

// imports and variables for stripe
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
const stripePromise: Promise<Stripe | null> = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

const MenuLayout = () => {
  // get location to change styles depending on what page we are
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);
  return (
    <Elements stripe={stripePromise}>
      <>
        <div>
          <Routes>
            <Route path='/*' element={<Home />} />
            <Route path='menu' element={<Menu />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='profile/*' element={<Profile />} />
          </Routes>
        </div>
        <nav className="bottom-menu">
          <div className="bottom-menu_left-side">
            <ul>
              <li>
                <Link to="home"> <img src={currentPath==='/home' ? homeIconSel : homeIcon} alt='home' /></Link>
              </li>
              <li>
                <Link to="menu"> <img src={currentPath==='/menu' ? menuIconSel : menuIcon} alt='menu' /></Link>
              </li>
            </ul>
          </div>
          <div className="bottom-menu_center">
            <div className="circle-wrapper">
              <Link to="cart">
                <button className="bottom-menu_center-btn">
                  <img src={shopIcon} alt='cart' />
                </button>
              </Link>
            </div>
            <div className="bottom-menu_center-div"></div>
          </div>
          <div className="bottom-menu_right-side">
            <ul>
              <li>
                <Link to="notifications"><img src={currentPath==='/notifications' ? notificationIconSel : notificIcon} alt='notifications' /></Link>
              </li>
              <li>
                <Link to="profile/account"><img src={currentPath==='/profile/account' ||currentPath==='/profile/payment' ||currentPath==='/profile/history' ? profileIconSel : profileIcon} alt='profile' /></Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    </Elements>
  );
}

export default MenuLayout;
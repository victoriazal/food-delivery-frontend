import Profile from "../profile/Profile";
import homeIcon from "../../assets/images/menu-icons/home.png"
import notificIcon from "../../assets/images/menu-icons/bell.png"
import menuIcon from "../../assets/images/menu-icons/book.png"
import profileIcon from "../../assets/images/menu-icons/profile.png"
import shopIcon from "../../assets/images/menu-icons/shop.png"
import './menuLayout.scss'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "../home/Home";
import PageNotFound from "../notFound/PageNotFound";
import Menu from "../menu/Menu";
import Notifications from "../notifications/Notifications";

const MenuLayout = () => {
  const location = useLocation()
  return (
    <>
      <div>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='menu' element={<Menu />} />
          <Route path='profile' element={<Profile />} />
          <Route path='notifications' element={<Notifications />} />
        </Routes>
      </div>
      <nav className="bottom-menu">
        <div className="bottom-menu_left-side">
          <ul>
            <li onClick={() => { location.pathname = '/home' }}>
              <Link to="home"> <img src={homeIcon} alt='home' /></Link>
            </li>
            <li>
             <Link to="menu"> <img src={menuIcon} alt='home' /></Link>
            </li>
          </ul>
        </div>
        <div className="bottom-menu_center">
          <div className="circle-wrapper">
            <button className="bottom-menu_center-btn">
              <img src={shopIcon} alt='home' />
            </button>
          </div>
          <div className="bottom-menu_center-div"></div>
        </div>
        <div className="bottom-menu_right-side">
          <ul>
            <li>
              <Link to="notifications"><img src={notificIcon} alt='home' /></Link>
            </li>
            <li>
              <Link to="profile"><img src={profileIcon} alt='home'/></Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default MenuLayout;
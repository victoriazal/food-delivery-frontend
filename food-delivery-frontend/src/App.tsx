import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './assets/router/privateRoute';
import LogIn from './components/auth/logIn/logIn';
import SignUp from './components/auth/signUp/signUp';
import Cart from './components/cart/Cart';
import MenuLayout from './components/layout/MenuLayout';
import PageNotFound from './components/notFound/PageNotFound';

function App() {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") ?? "dark";
    document.documentElement.setAttribute('data-theme', storedTheme);
    if(storedTheme==="dark" ){
      document.getElementById("darkmode-toggle")?.setAttribute("checked","checked")}
  }, []);
  return (
    <div className="App dark-theme">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='cart' element={<Cart />} />
          <Route path='/*' element={<MenuLayout />} />
        </Route>
        <Route path='/logIn' element={<LogIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/notFound' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

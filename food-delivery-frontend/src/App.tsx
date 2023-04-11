import { Routes, Route } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './assets/router/privateRoute';
import LogIn from './components/auth/logIn/logIn';
import SignUp from './components/auth/signUp/signUp';
import Home from './components/home/Home';
import MenuLayout from './components/layout/MenuLayout';
import PageNotFound from './components/notFound/PageNotFound';
import Profile from './components/profile/Profile';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route element={<PrivateRoute />} >
           
          </Route>
          <Route path='/*' element={<MenuLayout/>} />
          <Route path='/logIn' element={<LogIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/notFound' element={<PageNotFound />} />
        </Routes>
    </div>
  );
}

export default App;

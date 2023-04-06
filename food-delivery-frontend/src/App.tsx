import { Routes,Route } from 'react-router-dom';
import './App.scss';
import LogIn from './components/auth/logIn/logIn';
import SignUp from './components/auth/signUp/signUp';
import Profile from './components/profile/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='*' element={<LogIn/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
 
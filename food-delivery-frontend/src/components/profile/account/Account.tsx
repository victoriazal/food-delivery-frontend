import { useNavigate } from 'react-router-dom';
import { instance } from '../../../assets/axios';
import './account.scss'
const Account = () => {
  const navigate = useNavigate()
  // logout 
  const handleLogOut =  ()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('isLogged');
    navigate('/login')
  }
  return (
      <div className='account'>
        <button onClick={()=>{handleLogOut()}} className='account_logout-btn'>Log Out</button>
      </div>
  );
}

export default Account;
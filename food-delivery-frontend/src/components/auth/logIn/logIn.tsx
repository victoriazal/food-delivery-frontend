import './logIn.scss';
import logo from '../../../assets/images/shopping-bag.png';
import showPasswordIcon from '../../../assets/images/show-password-eye.png'
import googleLogo from '../../../assets/images/google.png'
import { useState } from 'react';
import { instance } from '../../../assets/axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../assets/hook';
import { login } from '../../../store/slice/auth';

const LogIn: React.FC = (): JSX.Element => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // show and hide password
  const toggleShowPassword = (e:{preventDefault:()=> void},input:string)=>{
    e.preventDefault()
    let myInput = document.getElementById(input) as HTMLInputElement
    myInput!.type === "password" ? myInput!.type = "text":myInput!.type = "password"
}

// loginLogic
  const handleLogIn = async(e:{preventDefault:()=> void})=>{
    try{
      e.preventDefault()
      const userData = {
          email:email,
          password:password
      }
      const user = await instance.post('http://localhost:5000/auth/login',userData)
      await dispatch(login(user.data))
      navigate("/profile")
    }catch(e){
      console.log(e)
      return e
    }
  }
  return (
      <div className="logIn">
        <header className='logIn__header'>
          <img alt='corner food ' src={logo}/>
          <h2>Corner Food</h2>
          <span>Delivery App</span>
          <div className='logIn__header-btns'>
            <button onClick={()=>{navigate("/")}}>Login</button>
            <button onClick={()=>{navigate("/signUp")}}>Signup</button>
          </div>
        </header>
          <form onSubmit={handleLogIn}  action="submit" method="post" className='logIn-form'>
            <div className='logIn-form__email'>
              <p>Email Address</p>
              <input onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" id="logInEmail" />
            </div>
            <div className='logIn-form__password'>
              <p>Password</p>
              <div>
              <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" id="logInPassword" />
              <button  onClick={(e)=>{toggleShowPassword(e,"logInPassword")}} className='logIn-form__password' ><img alt='show password' src={showPasswordIcon}/></button>
              </div>
            </div>
            <div className='logIn-form__forgot-password'>
              <a href='/home'><img alt="google authentification" src={googleLogo}/>LogIn with Google</a>
              <a href='/home'>Forgot password?</a>
            </div>
            <div className='logIn-form__button'>
              <button type="submit">Log In</button>
            </div>
          </form>
      </div>
  );
}

export default LogIn;
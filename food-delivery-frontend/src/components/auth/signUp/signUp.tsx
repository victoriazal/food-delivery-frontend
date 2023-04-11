import './signUp.scss';
import logo from '../../../assets/images/shopping-bag.png';
import showPasswordIcon from '../../../assets/images/show-password-eye.png'
import { useState } from 'react';
import { instance } from '../../../assets/axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../assets/hook';
import { login } from '../../../store/slice/auth';

const SignUp = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [username,setUsername] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const toggleShowPassword = (input:string)=>{
      let myInput = document.getElementById(input) as HTMLInputElement
      myInput!.type === "password" ? myInput!.type = "text":myInput!.type = "password"
  }
  const handleSignUp = async(e:{preventDefault:()=> void;})=>{
    if(password===confirmPassword){
      e.preventDefault()
      const userData = {
        email,
        password,
        username
      }
      const newUser = await instance.post('http://localhost:5000/auth/register',userData)
      await dispatch(login(newUser.data))
      navigate("/profile")
    }
    else {
      throw new Error("passwords do not match")
    }
  }
  return (
      <div className="signUp">
        <header className='signUp__header'>
          <img alt='corner food ' src={logo}/>
          <h2>Corner Food</h2>
          <span>Delivery App</span>
          <div className='signUp__header-btns'>
            <button onClick={()=>{navigate("*")}}>Login</button>
            <button>Signup</button>
          </div>
        </header>
          <form onSubmit={handleSignUp} action="submit" method="post" className='signUp-form'>
          <div className='signUp-form__email'>
              <p>Username</p>
              <input onChange={(e)=>{setUsername(e.target.value)}}  type="text" name="username" id="signUpUsername" />
            </div>
            <div className='signUp-form__email'>
              <p>Email Address</p>
              <input onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" id="signUpEmail" />
            </div>
            <div className='signUp-form__password'>
              <p>Password</p>
              <div>
              <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" id="signUpPassword" />
              <button type='button' onClick={()=>{toggleShowPassword("signUpPassword")}} className='signUp-form__password' ><img alt='show password' src={showPasswordIcon}/></button>
              </div>
            </div>
            <div className='signUp-form__password'>
              <p>Confirm</p>
              <div>
              <input onChange={(e)=>{setConfirmPassword(e.target.value)}}  type="password" name="password" id="signUpConfirmPassword" />
              <button type='button' onClick={()=>{toggleShowPassword("signUpConfirmPassword")}} className='signUp-form__password' ><img alt='show password' src={showPasswordIcon}/></button>
              </div>
            </div>
            <div className='signUp-form__button'>
              <button type="submit">Signup</button>
            </div>
          </form>
      </div>
  );
}

export default SignUp;
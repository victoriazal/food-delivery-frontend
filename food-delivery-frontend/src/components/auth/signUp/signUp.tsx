import './signUp.scss';
import logo from '../../../assets/images/shopping-bag.png';
import showPasswordIcon from '../../../assets/images/show-password-eye.png'
import { useEffect, useState } from 'react';
import { instance } from '../../../assets/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../../store/slice/auth';
import { useAppDispatch } from '../../../assets/hooks/hooks';

const SignUp = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [username,setUsername] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // get location to change styles depending on what page we are
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  // look what theme it was
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") ?? "dark";
    document.documentElement.setAttribute('data-theme', storedTheme);
    if(storedTheme==="dark" ){
      document.getElementById("darkmode-toggle")?.setAttribute("checked","checked")}
  }, []);
// show and hide password
  const toggleShowPassword = (e:{preventDefault:()=> void},input:string)=>{
      let myInput = document.getElementById(input) as HTMLInputElement
      myInput!.type === "password" ? myInput!.type = "text":myInput!.type = "password"
  }

  // signUp logic
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
        <header className='signUp_header'>
          <img alt='corner food ' src={logo}/>
          <h2>Corner Food</h2>
          <span>Delivery App</span>
          <div className='signUp_header-btns'>
            <button onClick={()=>{navigate("*")}}>Login</button>
            <button className={currentPath==='/signUp' ? "activePage" : ""}>Signup</button>
          </div>
        </header>
          <form onSubmit={handleSignUp} action="submit" method="post" className='signUp-form'>
          <div className='signUp-form_email'>
              <p>Username</p>
              <input onChange={(e)=>{setUsername(e.target.value)}}  type="text" name="username" id="signUpUsername" />
            </div>
            <div className='signUp-form_email'>
              <p>Email Address</p>
              <input onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" id="signUpEmail" />
            </div>
            <div className='signUp-form_password'>
              <p>Password</p>
              <div>
              <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" id="signUpPassword" />
              <button type='button' onClick={(e)=>{toggleShowPassword(e,"signUpPassword")}} className='signUp-form_password' ><img alt='show password' src={showPasswordIcon}/></button>
              </div>
            </div>
            <div className='signUp-form_password'>
              <p>Confirm</p>
              <div>
              <input onChange={(e)=>{setConfirmPassword(e.target.value)}}  type="password" name="password" id="signUpConfirmPassword" />
              <button type='button' onClick={(e)=>{toggleShowPassword(e,"signUpConfirmPassword")}} className='signUp-form_password' ><img alt='show password' src={showPasswordIcon}/></button>
              </div>
            </div>
            <div className='signUp-form_button'>
              <button type="submit">Signup</button>
            </div>
          </form>
      </div>
  );
}

export default SignUp;
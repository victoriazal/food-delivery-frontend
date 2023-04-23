import './logIn.scss';
import logo from '../../../assets/images/shopping-bag.png';
import showPasswordIcon from '../../../assets/images/show-password-eye.png'
import googleLogo from '../../../assets/images/google.png'
import { useEffect, useState } from 'react';
import { instance } from '../../../assets/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../../store/slice/auth';
import { useAppDispatch } from '../../../assets/hooks/hooks';

const LogIn: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
  const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, inputId: string) => {
    e.preventDefault();
    const input = document.getElementById(inputId) as HTMLInputElement;
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = {
        email: email,
        password: password
      };
      const response = await instance.post('http://localhost:5000/auth/login', userData);
      await dispatch(login(response.data));
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="logIn">
      <header className='logIn_header'>
        <img alt='corner food ' src={logo} />
        <h2>Corner Food</h2>
        <span>Delivery App</span>
        <div className='logIn_header-btns'>
          <button className={currentPath==='/login' ? "activePage" : ""} onClick={() => { navigate('/') }}>Login</button>
          <button onClick={() => { navigate('/signUp') }}>Signup</button>
        </div>
      </header>
      <form onSubmit={handleLogIn} className='logIn-form'>
        <div className='logIn-form_email'>
          <p>Email Address</p>
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="logInEmail" />
        </div>
        <div className='logIn-form_password'>
          <p>Password</p>
          <div>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="logInPassword" />
            <button onClick={(e) => toggleShowPassword(e, 'logInPassword')} className='logIn-form_password' ><img alt='show password' src={showPasswordIcon} /></button>
          </div>
        </div>
        <div className='logIn-form_forgot-password'>
          <a href='/home'><img alt="google authentication" src={googleLogo} />LogIn with Google</a>
          <a href='/home'>Forgot password?</a>
        </div>
        <div className='logIn-form_button'>
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;

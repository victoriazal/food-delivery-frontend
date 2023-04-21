import './logIn.scss';
import logo from '../../../assets/images/shopping-bag.png';
import showPasswordIcon from '../../../assets/images/show-password-eye.png'
import googleLogo from '../../../assets/images/google.png'
import { useState } from 'react';
import { instance } from '../../../assets/axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../store/slice/auth';
import { useAppDispatch } from '../../../assets/hooks/hooks';

const LogIn: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      <header className='logIn__header'>
        <img alt='corner food ' src={logo} />
        <h2>Corner Food</h2>
        <span>Delivery App</span>
        <div className='logIn__header-btns'>
          <button onClick={() => { navigate('/') }}>Login</button>
          <button onClick={() => { navigate('/signUp') }}>Signup</button>
        </div>
      </header>
      <form onSubmit={handleLogIn} className='logIn-form'>
        <div className='logIn-form__email'>
          <p>Email Address</p>
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="logInEmail" />
        </div>
        <div className='logIn-form__password'>
          <p>Password</p>
          <div>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="logInPassword" />
            <button onClick={(e) => toggleShowPassword(e, 'logInPassword')} className='logIn-form__password' ><img alt='show password' src={showPasswordIcon} /></button>
          </div>
        </div>
        <div className='logIn-form__forgot-password'>
          <a href='/home'><img alt="google authentication" src={googleLogo} />LogIn with Google</a>
          <a href='/home'>Forgot password?</a>
        </div>
        <div className='logIn-form__button'>
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;

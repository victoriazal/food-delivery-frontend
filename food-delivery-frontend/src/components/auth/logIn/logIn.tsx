import './logIn.scss';
import logo from '../../../assets/images/shopping-bag.png';
import showPasswordIcon from '../../../assets/images/show-password-eye.png'
import googleLogo from '../../../assets/images/google.png'
const LogIn = () => {
  return (
      <div className="logIn">
        <header className='logIn__header'>
          <img alt='corner food ' src={logo}/>
          <h2>Corner Food</h2>
          <span>Delivery App</span>
          <div className='logIn__header-btns'>
            <button>Login</button>
            <button>Signup</button>
          </div>
        </header>
          <form action="" method="post" className='logIn-form'>
            <div className='logIn-form__email'>
              <p>Email Address</p>
              <input type="email" name="email" id="logInEmail" />
            </div>
            <div className='logIn-form__password'>
              <p>Password</p>
              <div>
              <input  type="password" name="password" id="logInPassword" />
              <button className='logIn-form__password' ><img alt='show password' src={showPasswordIcon}/></button>
              </div>
            </div>
            <div className='logIn-form__forgot-password'>
              <a href='/home'><img src={googleLogo}/>LogIn with Google</a>
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
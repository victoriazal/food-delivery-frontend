import './signUp.scss';
import logo from '../../../assets/images/shopping-bag.png';
import showPasswordIcon from '../../../assets/images/show-password-eye.png'
const SignUp = () => {
  return (
      <div className="signUp">
        <header className='signUp__header'>
          <img alt='corner food ' src={logo}/>
          <h2>Corner Food</h2>
          <span>Delivery App</span>
          <div className='signUp__header-btns'>
            <button>Login</button>
            <button>Signup</button>
          </div>
        </header>
          <form action="" method="post" className='signUp-form'>
          <div className='signUp-form__email'>
              <p>Username</p>
              <input type="text" name="username" id="signUpUsername" />
            </div>
            <div className='signUp-form__email'>
              <p>Email Address</p>
              <input type="email" name="email" id="signUpEmail" />
            </div>
            <div className='signUp-form__password'>
              <p>Password</p>
              <div>
              <input  type="password" name="password" id="signUpPassword" />
              <button className='signUp-form__password' ><img alt='show password' src={showPasswordIcon}/></button>
              </div>
            </div>
            <div className='signUp-form__password'>
              <p>Confirm</p>
              <div>
              <input  type="password" name="password" id="signUpConfirmPassword" />
              <button className='signUp-form__password' ><img alt='show password' src={showPasswordIcon}/></button>
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
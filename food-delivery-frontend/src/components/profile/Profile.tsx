import './profile.scss';
import addPhoto from '../../assets/images/add_a_photo.png'
const Profile = () => {
  return (
      <div className="profile">
        <header className='profile__header'>
          <h2>My Profile</h2>
          <div className='profile__header-data'>
            <button className='profile__header-photo' ><img src={addPhoto}/></button>
            <div>
              <h3>Username</h3>
              <h4>myemail@gmail.com</h4>
              <h4>User ID : 123456</h4>
            </div>
          </div>
          <div className='profile__header-btns'>
            <button>Account</button>
            <button>Payment</button>
            <button>History</button>
          </div>
        </header>
      </div>
  );
}

export default Profile;
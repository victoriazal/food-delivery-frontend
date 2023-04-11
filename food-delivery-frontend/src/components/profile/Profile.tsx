import './profile.scss';
import addPhoto from '../../assets/images/add_a_photo.png'
import store from '../../store/store';

const Profile = () => {
  type userDataObj = {
    username?:string,
    id?:number,
    email?:string
  }
  const  userData: userDataObj = store.getState().auth.user
  return (
      <div className="profile">
        <header className='profile__header'>
          <h2>My Profile</h2>
          <div className='profile__header-data'>
            <button className='profile__header-photo' ><img src={addPhoto}/></button>
            <div>
              <h3>{userData.username}</h3>
              <h4>{userData.email}</h4>
              <h4>User ID : {userData.id}</h4>
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
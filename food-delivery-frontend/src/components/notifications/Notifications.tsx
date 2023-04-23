import './notifications.scss'
import callCourierImg from '../../assets/images/callCourier.png'
import timeImg from '../../assets/images/time.png'
const Notifications = () => {
  return (
    <div className='notifications-page'>
      <h3>Notification</h3>
      <div className='notifications'>
        <div className='notifications-card'>
          <div>
            <img/>
            <div>
            <h3>name</h3>
            <h4>ID:</h4>
            <h4>Food courier</h4>
            </div>
            <button type='button'><img src={callCourierImg} alt='call courier'/></button>
          </div>
          <hr></hr>
          <div>
            <div>
              <img src={timeImg}/>
              <div>
                <span>Your Delivery time</span>
                <h4>45 minutes</h4>
              </div>
            </div>
            <div>
              <img src={timeImg}/>
              <div>
                <span>Your Delivery Address</span>
                <h4>City</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
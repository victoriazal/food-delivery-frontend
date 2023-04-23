import './notifications.scss';
import callCourierImg from '../../assets/images/callCourier.png';
import timeImg from '../../assets/images/time.png';
import locationImage from '../../assets/images/location.png';
import { useEffect, useState } from 'react';
import { Dish } from '../../assets/hooks/favoriteDishesAndCartHook';
const Notifications = () => {
  //  we are getting our order from the localStorage and mapping over it to see
  //  how much time it is gonna take to cook each dish and choose the biggest one
  //  and then add 30 minutes because we live in the big city and it takes at least 30 minutes to get anywhere
  const order: string | null = localStorage.getItem('order');
  const estimatedDeliveryTime: number = Math.max(...JSON.parse(order || "[]").map((currentValue: {time: string})=>Number(currentValue.time))) + 30;
 
  type Courier = {
    id: number;
    image: string;
    name: string;
    phone:string;
  }
  const [courier, setCourier] = useState<Courier | undefined>();
  const [deliveryTime, setDeliveryTime] = useState<number | null>(null);

  useEffect(() => {
    if (order) {
      setDeliveryTime(estimatedDeliveryTime);
      const courierString = localStorage.getItem('courier');
      if (courierString) {
        const courierObj: Courier = JSON.parse(courierString);
        setCourier(courierObj);
        // Set a timeout to clear the courier from local storage when the estimated delivery time expires
        setTimeout(() => {
          localStorage.removeItem('courier');
        }, estimatedDeliveryTime * 60000); // Convert minutes to milliseconds
      }
    }
  }, []);

  useEffect(() => {
    const courierString = localStorage.getItem('courier');
    if (courierString) {
      const courierObj = JSON.parse(courierString);
      setCourier(courierObj);
    }
  }, []);
  
  const handleCall = () => {
    if(courier){
      window.open(`tel:${courier.phone}`);
    }
  };
 
  if(courier){ return (
    <div className='notifications-page'>
      <h3 className='notifications-page_header'>Notification</h3>
      <div className='notifications'>
        <div className='notifications-card'>
          <div className='notifications-card_courier-wrapper'>
            <img alt='courier' src={`http://localhost:5000/courier/${courier.image}`} className='notifications-card_img'/>
            <div className='notifications-card_courier-info'>
            <h3>{courier.name}</h3>
            <h4>ID:{courier.id}</h4>
            <span>Food courier</span>
            </div>
            <button onClick={handleCall} className='notifications-card_call-courier' type='button'><img src={callCourierImg}  alt='call courier'/></button>
          </div>
          <hr></hr>
          <div className='notifications-card_delivery'>
            <div className='notifications-card_delivery_time'>
              <img alt='time' className='notifications-card_delivery_time-img' src={timeImg}/>
              <div className='notifications-card_delivery_time-info'>
                <span>Your Delivery time</span>
                <h4>{estimatedDeliveryTime} minutes</h4>
              </div>
            </div>
            <div className='notifications-card_delivery_location'>
              <img alt='location' src={locationImage}/>
              <div>
                <span>Your Delivery Address</span>
                <h4>City</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
 else{
  return(
    <h2 className='no-orders'>No orders yet</h2>
  )
 }
}

export default Notifications;
import { CardElement } from "@stripe/react-stripe-js";
// import { PaymentElement } from "@stripe/react-stripe-js";
// import { instance } from "../../../assets/axios";
import './payment.scss'
const Payment = () => {

  // styles for the card element
  const cardElementOptions = {
    style: {
      hidePostalCode: true,
      base: {
        fontSize: '12px',
        fontFamily: 'Poppins',
        color: '#FFFFFF',
        '::placeholder': {
          color: '#aab7c4',
        },
        fontSmoothing: 'antialiased',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  // const {data:clientSecret} = await instance.post('stripe/payment_intens',{
  //   amount: price *100
  // })
  return (
    <div className="payment">
      <div className="payment_my-card">
        <h2>My card</h2>
        <div className="card">
          <CardElement options={cardElementOptions} />
        </div>
      </div>
    </div>
  );
}

export default Payment;
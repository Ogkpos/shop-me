import axios from 'axios';
import { popAlert } from './alert';

const stripe = Stripe(
  'pk_test_51NsRkZDolqEj84itm7bNy0SsuX4KZDjI009Nerh9fSIduIeBYnE9WHekcdYUGofbYR67DBg1PFxm4Jl6O0hM23eP00GAF4Uend'
);

export const orderProduct = async (productId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/orders/checkout-session/${productId}`);

    // 2)  Create checkout form and charge through card.
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
    popAlert('error', err);
  }
};

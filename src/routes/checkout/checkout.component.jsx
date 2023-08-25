import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total2 = 0;
    cartItems.forEach(cartItem => {
      let totalItemAmt = cartItem.quantity * cartItem.price;
      total2 += totalItemAmt;
    });

    setTotal(total2);
  }, [cartItems])

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>

      {cartItems
        .map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        )}
      <span className='total'>Total: ${cartTotal}</span>
    </div>
  );
}

export default Checkout;
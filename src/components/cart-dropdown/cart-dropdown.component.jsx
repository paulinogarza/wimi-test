import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import { CartContext } from '../../contexts/cart.context';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length === 0 && (<EmptyMessage>Your cart is empty</EmptyMessage>)}
        {cartItems && cartItems.map((item) => {
          console.log(item);
          return <CartItem key={item.id} cartItem={item} />
        })}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
}

export default CartDropdown;
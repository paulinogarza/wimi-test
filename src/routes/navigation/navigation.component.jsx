import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles.jsx';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/' >
          <CrwnLogo className='logo' />
        </LogoContainer>

        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser ?
              (<NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>) :
              (<NavLink to='/auth'>
                Sign In
              </NavLink>
              )
          }
          <CartIcon />
        </NavLinks>
      </NavigationContainer>
      {isCartOpen && <CartDropdown />}
      {/* {isCartOpen 
          ? (<CartDropdown />) 
          : ''
      } */}

      <Outlet />
    </Fragment>
  )
}

export default Navigation;
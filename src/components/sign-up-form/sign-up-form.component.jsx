import { useState, useContext } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
}
  from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';
import { UserContext } from '../../contexts/user.context';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  console.log('hit');

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords Do Not Match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('It failed, cannot create user, email already in use');
      }
      console.log(error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <div className='sign-up-container'>
      <form onSubmit={handleSubmit}>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password.</span>

        <FormInput label='Display Name' type='text' required name='displayName' value={displayName} onChange={handleChange} />

        <FormInput label='Email' type='email' required name='email' value={email} onChange={handleChange} />

        <FormInput label='Password' type='password' required name='password' value={password} onChange={handleChange} />

        <FormInput label='Confirm Password' type='password' required name='confirmPassword' value={confirmPassword} onChange={handleChange} />

        <Button>Submit</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
import { useState } from 'react';
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInUserWithEmailAndPassword
}
  from '../../utils/firebase/firebase.utils';


import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formFields;

    if (!email || !password)
      return alert('Email and password must be filled out');

    try {
      const response = await signInUserWithEmailAndPassword(email, password);
      console.log('user logged in response', response);
      resetFormFields();
    } catch (error) {
      console.log('user log in error: ', error);
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Wrong email/password');
          break;
        case 'auth/user-not-found':
          break;
        default:
          console.log(error);
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  return (
    <div className='sign-in-container'>
      <form onSubmit={handleSubmit}>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password.</span>
        <FormInput label='Email' type='email' required name='email' value={email} onChange={handleChange} />

        <FormInput label='Password' type='password' required name='password' value={password} onChange={handleChange} />
        <div className='buttons-container'>
          <Button type='submit' >Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle} type='submit' >Google Sign In</Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
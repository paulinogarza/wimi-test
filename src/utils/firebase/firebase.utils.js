// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
}
  from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
}
  from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsVFk2kk0kDtHmF2xiG5UE4BBwRkIJ2Yg",
  authDomain: "crown-clothing-db-df621.firebaseapp.com",
  projectId: "crown-clothing-db-df621",
  storageBucket: "crown-clothing-db-df621.appspot.com",
  messagingSenderId: "804050642746",
  appId: "1:804050642746:web:c151bf29bf35658c335203"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdDate = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdDate
      })
    }
    catch (error) {
      console.log(error);
    }
  }
  return userDocRef;
}
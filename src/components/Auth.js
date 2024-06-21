import { useState } from 'react';
import { auth, googleProvider } from '../config/firestore';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    // i guess we are going to wrap our await in a try catch!
    try{
    await createUserWithEmailAndPassword(auth, email, password)
    } catch(err){
      console.error(err);
    }
  };
  
  const signInWithGoogle = async () => {
    try{
    await signInWithPopup(auth, googleProvider)
    } catch(err){
      console.error(err);
    }
  };

  const logOut = async () => {
    try{
    await signOut(auth);
    } catch(err){
      console.error(err);
    }
  };

  return (<div>
    <input placeholder="email..." onChange={(e) => setEmail(e.target.value)}/>
    <input placeholder="password..." type='password' onChange={(e) => setPassword(e.target.value)}/>
    <button onClick={signIn}>Sign In</button>
    <button onClick={signInWithGoogle}>Sign in with google</button>
    <button onClick={signInWithGoogle}>Sign Out</button>
  </div>
  );
};
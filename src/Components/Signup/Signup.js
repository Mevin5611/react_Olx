import React from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useState } from 'react';
/* import { FirebaseContext } from '../../store/FirebaseContext'; */
import {createUserWithEmailAndPassword,getAuth, updateProfile} from "firebase/auth";
import {collection,addDoc} from 'firebase/firestore'
import 'firebase/compat/firestore'
import { Firebase, db} from '../../firebase/config'
import {useNavigate} from 'react-router-dom'


export default function Signup() {
  const [username,setUsername] =useState('')
  const [useremail,setUserEmail] =useState('')
  const [userphone,setUserPhone] =useState('')
  const [userpassword,setUserPassword] =useState('')
  const navigate = useNavigate();
  let email=useremail
  let password = userpassword
  let displayName= username
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(useremail,userpassword);
    const auth = getAuth(Firebase);
createUserWithEmailAndPassword(auth, email, password)
.then(async(userCredential) => {
  // Signed in 

  const user = userCredential.user;
  await updateProfile(auth.currentUser, { displayName})
    
    // ...
    try {
      const docRef = await addDoc(collection(db, "users"), {
        id:user.uid,
        name: username,
        phone: userphone
        
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }).then(()=>{
    navigate('/login');
  })
    
      
    
  
    
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='noimage'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={useremail}
            onChange={(e)=>setUserEmail(e.target.value)}
            id="fname"
            name="email"
            
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={userphone}
            onChange={(e)=>setUserPhone(e.target.value)}
            id="lname"
            name="phone"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={userpassword}
            onChange={(e)=>setUserPassword(e.target.value)}
            id="lname"
            name="password"
            
          />
          <br />
          <br />
          <button onClick={handleSubmit}>Signup</button>
        </form>
        <a href="#">Login</a>
      </div>
    </div>
  );
}

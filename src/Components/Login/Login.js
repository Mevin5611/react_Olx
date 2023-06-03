import React from 'react';
import {useState} from 'react'
import Logo from '../../olx-logo.png';
import './Login.css';
/* import {FirebaseContext} from '../../store/FirebaseContext' */
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'

function Login() {
  const [useremail,setUserEmail] = useState('')
  const [userpassword,setUserPassword] = useState('')
  const auth = getAuth();
  const navigate = useNavigate();
  let email= useremail
  let password = userpassword

  const handleSubmit=(e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert('loged in')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  }).then(()=>{
    navigate('/')
  })
  }
  
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={useremail}
            onChange={(e)=>setUserEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
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
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <span onClick={()=>{
          navigate('/signup')
        }}>Signup</span>
      </div>
    </div>
  );
}

export default Login;

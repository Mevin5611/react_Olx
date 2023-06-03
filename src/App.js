import React, { useContext, useEffect } from 'react';
import './App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthContext, FirebaseContext } from './store/Context';
import { Firebase } from './firebase/config';
import ViewPost from './Pages/ViewPost';
import Post from './store/postContext';

function App() {
  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth(Firebase);
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  })
  return (
    <div>
      <Post>
        <Router>
          <Routes>


            <Route excat path='/' element={<Home />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Create' element={<Create />} />
            <Route path='/view' element={<ViewPost />} />

          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;

import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { postContext } from '../../store/postContext';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config'
function View() {
  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(postContext)

  useEffect(() => {
    const { userId } = postDetails
    const q = query(collection(db, "users"), where("id", "==", userId));
    getDocs(q).then((res) => {

      res.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUserDetails(doc.data())
      });
    })
  }, [])
  return (
    <div className="viewParentDiv">
       
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      
      < div className="rightSection">
        <div className="productDetails">
          <p>{postDetails.Price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.Category}</p>
          <span>{postDetails.createdate}</span>
        </div>
      
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.name}</p>
          <p>{userDetails.phone}</p>
        </div>}

      </div>
    </div>
  );
}
export default View;

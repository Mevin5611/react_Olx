import React, { Fragment ,useContext,useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/Context'
import { getStorage, ref ,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { Firebase ,db} from '../../firebase/config';
import {collection,addDoc} from 'firebase/firestore'

const Create = () => {
  const storage = getStorage(Firebase);
  /* const imagesRef = ref(storage, `${image.name}`); */
  
  const {user} = useContext(AuthContext)
  const [name ,setName] = useState('')
  const [Category ,setCategory] = useState('')
  const [Price ,setPrice] = useState('')
  const [image,setImage] = useState('')
  const storageRef = ref(storage, `images/${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);
  const date = new Date()
  
  const handleSubmit= (e) =>{
    e.preventDefault()
    uploadTask.on(image,
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        console.log('File available at', downloadURL);
        try {
          const docRef = await addDoc(collection(db, "products"), {
            name,
            Category,
            Price,
            url:downloadURL,
            userId:user.uid,
            createdate:date.toDateString()
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      });
    })
  
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
         
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={Category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input"
             type="number" 
             value={Price}
             onChange={(e)=>setPrice(e.target.value)}
             id="fname" 
             name="Price" />
            <br />
         
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} ></img>
        
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;

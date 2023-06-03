import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { db } from '../../firebase/config'

import Heart from '../../assets/Heart';
import './Post.css';
import { collection, getDocs } from 'firebase/firestore';
import { postContext } from '../../store/postContext';
import {useNavigate} from 'react-router-dom'

function Posts() {

  const [products, setProducts] = useState()
const {setPostDetails} =useContext(postContext)
const navigate = useNavigate();
  useEffect(() => {
    const prodCol = collection(db, 'products');
    getDocs(prodCol).then((res) => {
      const prodList = res.docs.map((product) => {

        return {
          ...product.data(),
          id: product.id

        }
      })
      setProducts(prodList)

    })


  }, [])

  console.log("items", products);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {products && products.map(product=>{

            return <div
              className="card"
              onClick={()=>{
                setPostDetails(product)
                navigate('/view')
              }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src= {product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">{product.Price}</p>
                <span className="kilometer">{product.Category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdate}</span>
              </div>
            </div>
          })

          }

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;

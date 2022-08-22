// import React, { Component, useState, useEffect} from "react";
import React, { useState, useEffect } from "react";
import {
     Link

    } from "react-router-dom";
import Axios from "axios";



export default function Home(){
    
    const [Name, setName] = useState("");
    const [review, setReview] = useState("");
    const [ReviewList, setReviewList] =  useState([]);
   
    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) =>{
          setReviewList(response.data)
        });//we called a promise 
      }, []); // hedhi trunny mara bark wa9teli l page t reloady donc ma3anech modification automatique, lezm nzideha bel react 
      
        const submitReview = () => {
          Axios.post("http://localhost:3001/api/insert", {
            Name: Name,
            Description: review,
            
          }).then((data)=> {
      
            Axios.get('http://localhost:3001/api/getbyid/'+ data.data.insertId).then((response) =>{
              console.log("data" , response);
              setReviewList([
                ...ReviewList,
                ...response.data
                
              ]); //response of sending the object and grabing that in the backend
            });
          });
        };
    return (
        <div className="App">
          <script src="https://kit.fontawesome.com/cc09314e2a.js" crossorigin="anonymous"></script>
          <h1>Gestion des logs</h1>
          <div className="form">
            <label> Name:</label>
            <input
              type="text"
              name="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label>Description:</label>
            <input
              type="text"
              name="review"
              onChange={(e) => {
              setReview(e.target.value);
              }}
            />
            <Link to="/log"><button onClick={submitReview}>Submit </button> </Link>
            
        </div>
      </div>
  );
}
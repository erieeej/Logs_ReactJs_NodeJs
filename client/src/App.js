import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios"; // allow us to make our own api request
import {FaCalendarAlt} from "react-icons/fa";
import {FaClock} from "react-icons/fa";
function App() {
  //we will create a state to get ay haja we write in the input
  const [Name, setName] = useState("");
  const [review, setReview] = useState("");
  const [ReviewList, setReviewList] =  useState([])

  //const [newReview, setNewReview] = useState("")

 /*var showdate= new Date(); 
 var displaytodaysdate =showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
var displaytime= showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();*/

//get the data and display the description on the web page: 
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
  /********<input type="text" value={displaytodaysdate} readOnly="true"/> {displaytime} */
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
        <button onClick={submitReview}>Submit</button>
        
        {ReviewList.map((val) => {
          return (
        <div className="tab">
            <table className ="table-style">
              <tbody>
                
              <tr>
                <td className="icons" > <FaCalendarAlt /> {(val.date_creation).substr(0,10)}</td>
                <td className="icons"><FaClock className="time"/> {val.time_creation}</td>
                <td className="name">{val.Name} </td> 
                <td className="description">{val.Description}</td>
                </tr>
              </tbody>
            </table>
        </div>           
          );
        })}
        
        </div>
      </div>
  );// to display the data on the screen */
}

export default App;

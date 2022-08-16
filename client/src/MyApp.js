import "./App.css";
import "./App.js";
import React, { useState} from "react";
import {FaCalendarAlt} from "react-icons/fa";
import {FaClock} from "react-icons/fa";

function App1(){

const [ReviewList, setReviewList] =  useState([])
return(
ReviewList.map((val) => {
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
  }))}
  export default App1;
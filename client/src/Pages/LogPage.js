import {FaCalendarAlt} from "react-icons/fa";
import {FaClock} from "react-icons/fa";
import "../App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Home(){
    const [ReviewList, setReviewList] =  useState([])
    const [Name] = useState("");
    const [review] = useState("");
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


      return ReviewList.map((val) =>
        
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
            )
          }
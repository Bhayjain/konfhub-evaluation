import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"
// import { fetchData } from "../Fetchapi";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-regular-svg-icons';


const Headingfile = () => {
    const [events, setEvents] = useState([]);
    const [icon, setIcon ] = useState();
    const [loading, setLoading] = useState(false)


  const fetchApi = async () => {
        try {
          const response = await axios.get(
            'https://dev-api.konfhub.com/event/public/konfhub-frontend-evaluation-task'
        );
          setEvents(response.data);
          setIcon(response.data.navbar_icon)

          console.log("icom", icon);

          console.log("events", events);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };



    useEffect(() => {
  
    
        fetchApi();
      }, []);

    return (
        
        <div style={{padding:"16px"}}> 
            <div className="heading_file">
                <img style={{width:"90px"}} src={icon} alt="icon" ></img>

                <i className="fa-regular fa-user"></i>              
                  </div>
        </div>
        
    )


   
}

export default Headingfile;
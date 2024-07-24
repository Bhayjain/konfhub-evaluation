import React, { useEffect, useState } from "react";
import Headingfile from "./heading_file/heading";
import axios from "axios";
import "./home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "bootstrap";
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
import { useNavigate } from "react-router-dom";
import { FaVideo } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaFacebookF } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdOutlineLink } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import About from "./about event/about";
import Ticket from "../Tickets/tickets";
import Speaker from "./speakersection/speaker";










const CountdownTimer = ({ targetDate }) => {
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [openNav, setOpenNav] = useState(false);
    const [loading, setLoading] = useState(false)




    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date();
            const eventDate = new Date(targetDate);
            const difference = eventDate - now;

            if (difference <= 0) {
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const totalSeconds = Math.floor(difference / 1000);
            const days = Math.floor(totalSeconds / (24 * 60 * 60));
            const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
            const seconds = Math.floor(totalSeconds % 60);

            setTimeRemaining({ days, hours, minutes, seconds });
        };

        // Calculate initial time remaining
        calculateTimeRemaining();

        // Update countdown every second
        const intervalId = setInterval(calculateTimeRemaining, 1000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [targetDate]);

    return (
        <div>
            <span>{timeRemaining.days}D : </span>
            <span>{timeRemaining.hours}H : </span>
            <span>{timeRemaining.minutes}M : </span>
            <span>{timeRemaining.seconds}S</span>
        </div>
    );
};





const Home = () => {
    const [icon, setIcon] = useState();
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([]);
    const Navigate = useNavigate();





    const fetchApi = async () => {
        try {
            const response = await axios.get(
                'https://dev-api.konfhub.com/event/public/konfhub-frontend-evaluation-task'
            );
            setEvents(response.data);
            setIcon(response.data.poster_thumbnail)

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



    const formatDateTime = (date, time, timeZone) => {
        const dateTimeString = `${date}T${time}`;
        const dateObj = new Date(dateTimeString + 'Z'); // 'Z' to denote UTC

        // Convert to IST
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
    
            hour12: true, 
            timeZoneName: 'short'
        };

        return dateObj.toLocaleString('en-IN', options);
    };

    // Format the start and end date and time
    const formattedStartDate = formatDateTime(events.start_date, events.start_time, events.time_zone, false);
    const formattedEndDate = formatDateTime(events.end_date, events.end_time, events.time_zone);

    console.log('Formatted Start Date:', formattedStartDate);
    console.log('Formatted End Date:', formattedEndDate);


    return (
        <div >
            <Headingfile />

            <div style={{ padding: "30px 50px" }}>
                <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-lg-9 col-md-6 col-sm-1 mycalendar"  style={{height:"945px"}}>
                        <div className="image_opt">
                            <div className="imtenal_opt">
                                <img style={{ width: "100%" }} src={icon} alt="" >
                                </img>
                            </div>

                        </div>

                        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav my_nav">
                    <a className="navbar-brand" href="#about-section">About</a>

                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="#ticket-section">
                        Tickets
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#speaker-section">This is speakers section</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#workshop-section">This is workshop section</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link disabled">This is event sponsors</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div id="about-section">
            <About />
          </div>
          <div id="ticket-section">
            <Ticket />
          </div>
          <div id="speaker-section">
            <Speaker />
          </div>

                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="card my_card" >
                            <h2 className="my_head">{events.name}</h2>

                            <div className="my_divv">
                                {/* <FontAwesomeIcon icon={faHouse} /> */}
                                <div className="my_div">
                                    <div style={{ marginRight: "14px" }}><FaVideo style={{ fontSize: "18px" }} /></div>
                                    <div>Online</div>
                                </div>
                                <div className="my_div">
                                    <div style={{ marginRight: "14px" }} ><FaTicket style={{ fontSize: "18px" }} />
                                    </div>
                                    <div>Paid</div>
                                </div>
                            </div>
                            <div className="event_link">
                                <span style={{ fontWeight: "bold" }}>Event Live Link :  </span> <span><a href={events.event_live_link}> Open streaming website</a></span>
                            </div>
                            <div style={{ textAlign: "start", marginTop: "10px" }} >
                                <span style={{ fontWeight: "bold" }}>Date :  </span> <span style={{ fontSize: ".875rem" }}>{formattedStartDate} - {formattedEndDate} </span>
                            </div>
                            <div>

                                <div className="my_buy_now">
                                    <span>EVENT STARTS IN</span>
                                    <div className="event_start">
                                        {events.start_date || events.start_time ? <CountdownTimer targetDate={new Date(events.start_date + 'T' + events.start_time + 'Z').toISOString()} /> : ""}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-dark my_buy_now" type="button" onClick={() => { Navigate("/checkout") }}>Buy Now</button>

                        <a href="https://dev.konfhub.com/konfhub-frontend-evaluation-task"> <button className="btn btn-dark my_buy_noww" type="button" >Offical Website</button></a>

                        <div className="">
                            <p className="my_hosted">HOSTED BY</p>
                            <div className="card my_card" >

                                <div className="organizer">
                                    <img style={{ width: "45px", borderRadius: "50%" }} src={events.organiser_image_url} alt=""></img>
                                    <p className="orgnazer_name" style={{ marginBottom: "0px", marginLeft: '15px' }}>{events.organiser_name}</p>
                                </div>

                                <p className="my_para">{events.organiser_info ? events.organiser_info.replace(/<\/?p>/g, '') : ""}</p>
                                <div>
                                    <p>Contact Us On</p>
                                    <div className="icon_displau">
                                        <div className="img_bg" >
                                            <a href={events.organizer_facebook_url}>
                                                <FaFacebookF style={{ color: "white" }} />
                                            </a>
                                        </div>
                                        <div className="img_bg" >
                                            <a href={events.organizer_twitter_url}>
                                                <RiTwitterXLine  style={{ color: "white" }} />
                                            </a>
                                        </div>
                                        <div className="img_bg" >
                                            <a href={events.organizer_linkedin_url}>
                                                <FaLinkedinIn style={{ color: "white" }} />
                                            </a>
                                        </div>
                                        <div className="img_bg" >
                                            <a href={events.organiser_website}>
                                                <MdOutlineLink style={{ color: "white" }} />
                                            </a>
                                        </div>
                                        <div className="img_bg" >
                                            <a href={events.organiser_email}>
                                                <MdOutlineMail style={{ color: "white" }} />
                                            </a>
                                        </div>
                                        <div className="img_bg" >
                                            <a href={events.organiser_phone}>
                                                <FaPhone style={{ color: "white" }} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>


    )
}


export default Home;
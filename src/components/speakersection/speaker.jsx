import React from "react"
import { useState, useEffect } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdOutlineLink } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import axios from "axios";
import "./speaker.css"


const Speaker = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false)
    const [img, Setimg] = useState()

    const [imgname, Setimgname] = useState("")
    const [imgheading, SetImgheading] = useState("")
    const [imgdegi, setImgdegi] = useState("")
    const [isModalOpen, setModalOpen] = useState(false);




    const toggleModal = () => {
        // setShowModal(!showModal);
      };
    
    


    const fetchApi = async () => {
        try {
            const response = await axios.get(
                'https://dev-api.konfhub.com/event/public/konfhub-frontend-evaluation-task'
            );
            setEvents(response.data);
            // setIcon(response.data.poster_thumbnail) 

            // console.log("icom", icon); 

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


    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
  

    return (
        <div>
            <div className="" style={{ textAlign: "left", marginTop: "30px" }}>
                <h3 className="my_hosted">{events.speaker_section_title}</h3>
                <p className=" " style={{ marginTop: "30px" }}>This is the description for speakers section</p>
                <div className="two_cards">
                <div className="card my_card"  style={{marginRight:"15px", width:"50%", height:"350px", cursor:"pointer"}} onClick={ () => {
                Setimg(events.organiser_image_url)
                Setimgname("Chairman")
                SetImgheading("Wayne Enterprises")
                openModal();

                }} >
                    <div>
                        <img style={{ width: "145px", borderRadius: "10" }} src={events.organiser_image_url} alt=""></img>
                        <p className="orgnazer_name" style={{ marginBottom: "0px", marginLeft: '' }}>{events.organiser_name}</p>
                    </div>
                    <p>Chairman</p>
                    <p>Wayne Enterprises</p>
                    <div>
                        <div className="icon_displau">
                            <div className="img_bg" >
                                <a href={events.organizer_facebook_url}>
                                    <FaFacebookF style={{ color: "white" }} />
                                </a>
                            </div>
                            <div className="img_bg" >
                                <a href={events.organizer_twitter_url}>
                                    <RiTwitterXLine style={{ color: "white" }} />
                                </a>
                            </div>
                            <div className="img_bg" >
                                <a href={events.organizer_linkedin_url}>
                                    <FaLinkedinIn style={{ color: "white" }}/>
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
                <div className="card my_card" style={{ width:"50%", height:"350px", cursor:"pointer"}} onClick={() => {
                          Setimg("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlLCmsWxqaI8JbDx7UtzxUd4aVOaTmzwSQRg&s")
                          Setimgname("Dark Knight")
                          SetImgheading("Batman")
                          openModal();

                }} >
                    <div>
                        <img style={{ width: "145px", borderRadius: "10", height:"145px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlLCmsWxqaI8JbDx7UtzxUd4aVOaTmzwSQRg&s" alt=""></img>
                        <p className="orgnazer_name" style={{ marginBottom: "0px", marginLeft: '' }}>Dark Knight</p>
                    </div>
                    <p>Dark Knight</p>
                    <p>Batman</p>
                    <div>
                        <div className="icon_displau">
                            <div className="img_bg" >
                                <a href={events.organizer_facebook_url}>
                                    <FaFacebookF style={{ color: "white" }} />
                                </a>
                            </div>
                            <div className="img_bg" >
                                <a href={events.organizer_twitter_url}>
                                    <RiTwitterXLine style={{ color: "white" }} />
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
                                    <FaPhone  style={{ color: "white" }} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>


            </div>


            <button onClick={openModal}>Open Modal</button>
      <div className={`modal-overlay ${isModalOpen ? 'show' : ''}`} onClick={closeModal}>
        <div className={`modal-content mymodal ${isModalOpen ? 'slide-in' : ''}`} onClick={e => e.stopPropagation()}>
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
          <div className="card my_card"  style={{height:"350px"}} >
                    <div>
                        <img style={{ width: "145px", borderRadius: "10" }} src={img} alt=""></img>
                        <p className="orgnazer_name" style={{ marginBottom: "0px", marginLeft: '' }}>{events.organiser_name}</p>
                    </div>
                    <p>{imgname}</p>
                    <p>{imgheading}</p>
                    <div>
                        <div className="icon_displau">
                            <div className="img_bg" >
                                <a href={events.organizer_facebook_url}>
                                    <FaFacebookF style={{ color: "white" }} />
                                </a>
                            </div>
                            <div className="img_bg" >
                                <a href={events.organizer_twitter_url}>
                                    <RiTwitterXLine style={{ color: "white" }} />
                                </a>
                            </div>
                            <div className="img_bg" >
                                <a href={events.organizer_linkedin_url}>
                                    <FaLinkedinIn style={{ color: "white" }}/>
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



     
    )

}

export default Speaker;
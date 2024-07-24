import React from "react";
import { useState } from "react";
import "./tickets.css"
import { IoLocationSharp } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const Ticket = () => {
    const [dinationbtn, setDontaionbtn] = useState(true)
    const [donationvalue, setDonationvalue] = useState("")
    const navigate = useNavigate();



    const [categories, setCategories] = useState([{
        type: "Free Ticket",
        description: "This is a ticket description. This is a free ticket. This ticket is categorized.",
        venue: "",
        additionalDetails: "This is additional venue details.",
        price: "FREE",
        buttonText: "Add",
        max: ""

    },
    {
        type: "Paid Ticket",
        description: "This is a ticket description. This is a paid ticket. This ticket is categorised.",
        venue: "KonfHub Technologies, Nagavarapalya, C V Raman Nagar, Bengaluru, Karnataka, India",
        additionalDetails: "This is additional venue details.",
        price: "₹1,000",
        buttonText: "Add",
        max: ""

    },
    {
        type: "Donation Ticket",
        description: "This is a ticket description. This is a paid ticket. This ticket is categorised.",
        venue: "KonfHub Technologies, Nagavarapalya, C V Raman Nagar, Bengaluru, Karnataka, India",
        additionalDetails: "This is additional venue details.",
        price: "₹1,000",
        minprice: "₹10",
        buttonText: "Add",
        max: "max"
    },
    {
        type: "Ticket With Coupon",
        description: "This is a ticket description. This is a paid ticket. This ticket is categorised.",
        venue: "KonfHub Technologies, Nagavarapalya, C V Raman Nagar, Bengaluru, Karnataka, India",
        additionalDetails: "This is additional venue details.",
        price: "₹1,000",
        buttonText: "Add",
        max: ""

    },

    ]);

    return (

        <div style={{ textAlign: "left", marginTop: "30px" }}>

            <h3>TICKETS</h3>

            <div style={{ textAlign: "center" }}>
                {categories.map((category, index) => (

                    <div className="card new_card" key={index}>
                        <div>
                            <h6 style={{ textAlign: "left" }}>
                                {category.type}
                            </h6>
                            <p className="additional" style={{ textAlign: "left" }}>{category.description}.</p>
                            <p className="additional" style={{ textAlign: "left", marginBottom: "0px" }}><spna><IoLocationSharp style={{ color: "rgb(13 110 253)", fill: "rgb(13 110 253)" }} />
                            </spna><a href="https://www.google.com/maps/search/?api=1&query=KonfHub+Technologies,+Nagavarapalya,+C+V+Raman+Nagar,+Bengaluru,+Karnataka,+India">KonfHub Technologies, Nagavarapalya, C V Raman Nagar, Bengaluru, Karnataka, India.</a>
                            </p>
                            <p className="additional" style={{ textAlign: "left", }}>{categories.additionalDetails}</p>

                            <div className="add_btn">
                                {category.max == "max" ? <h5 style={{ marginBottom: "0px", fontSize: "24px", fontWeight: "500" }}><span style={{ display: dinationbtn == true ? "block" : "none" }}>Min : {category.minprice} - Max : {category.price}</span><span style={{ display: dinationbtn == true ? "none" : "block" }}>₹{donationvalue}</span></h5>
                                    :
                                    <h5 style={{ marginBottom: "0px", fontSize: "24px", fontWeight: "500" }}>{category.price}</h5>}

                                {category.max === "max" ? (
                                    <div style={{ display: "flex", justifyContent: "end" }}>
                                        <button
                                            className="btn btn-dark "
                                            type="button"
                                            style={{ display: dinationbtn == false ? "none" : "block" }}
                                            onClick={() => navigate("checkout")}
                                        >
                                            Register
                                        </button>
                                        {dinationbtn == false ? <div className="donationn" >
                                            <MdCurrencyRupee />
                                            <div style={{ cursor: "pointer" }} aria-hidden="true" onClick={() => { setDontaionbtn(true); setDonationvalue("") }}>X</div>

                                        </div> : ""}

                                    </div>

                                ) : (
                                    <div>

                                        <button
                                            className="btn btn-dark "
                                            type="button"
                                            onClick={() => navigate("checkout")}
                                        >
                                            Register
                                        </button>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Ticket;
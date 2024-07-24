import React, { useState, useEffect, } from "react";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import "./style.css"
import { SlCalender } from "react-icons/sl";
import { IoLocationSharp } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

import { LuTicket } from "react-icons/lu";
import { MdOutlineDone } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { MdOutlinePayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const CategoryList = () => {
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


    const TicketData = [
        {
            categoryName: 'This is a Category',
            categoryDescription: 'This is category description. This category is collapsed by default.',
            expandedByDefault: false,
            tickets: [
                {
                    ticketName: "Free Ticket in Category1",
                    ticketDescription: 'This is a ticket description. This is a free ticket. This ticket is categorized.',
                    venueDetails: 'KonfHub Technologies, Nagavarapalya, C V Raman Nagar, Bengaluru, Karnataka, India',
                    ticketType: 'FREE',
                    price: null  
                },
                {
                    ticketName: "Paid Ticket in Category1",
                    ticketDescription: 'This is a ticket description. This is a paid ticket. This ticket is categorized.',
                    venueDetails: 'KonfHub Technologies, Nagavarapalya, C V Raman Nagar, Bengaluru, Karnataka, India',
                    ticketType: 'Paid',
                    price: '₹1,000'
                }
            ]
        },
        {
            categoryName: ' This is also a category. But with a little longer name.',
            categoryDescription: 'This is category description. This category is expanded by default. This is a little longer description. Adding more content to make the description look longer...',
            expandedByDefault: true,
            tickets: [
                {
                    ticketName: "Free Ticket in Category2",
                    ticketDescription: 'This is a ticket description. This is a free ticket. This ticket is categorized.',
                    venueDetails: 'KonfHub Technologies, Nagavarapalya, C V Raman Nagar, Bengaluru, Karnataka, India',
                    ticketType: 'FREE',
                    price: null  // or you can omit this field for free tickets
                },
                {
                    ticketName: "Paid Ticket in Category2",
                    ticketDescription: 'This is a ticket description. This is a paid ticket. This ticket is categorized.',
                    venueDetails: 'KonfHub Technologies, Nagavarapalya, C V Raman Nagar, Bengaluru, Karnataka, India',
                    ticketType: 'Paid',
                    price: '₹1,000'
                }
            ]
        }
    ];

    const [icon, setIcon] = useState();
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([]);
    const [counvalue, setCountvalue] = useState(Array(categories.length).fill(0))
    const [displaycount, setDisplaycount] = useState(false)
    const [detailsarray, setDetailarray] = useState([])
    const [donationvalue, setDonationvalue] = useState("")
    const [dinationbtn, setDontaionbtn] = useState(true)
    const [freeticketprice, setFeetickerprice] = useState("")
    const [paidetickets, setPaidtickets] = useState()
    const [ticketWithCoupon, setTicketWithCoupon] = useState()
    const [priceofpaidtickets, setPriceofpaidtickets] = useState()
    const [priceofcouponticket, setPriceofcouponticket] = useState()
    const [subtotal, setSubtotal] = useState(0)
    const [grandtotal, setGrandtotal] = useState("")
    const [accordionvalue, setAccordionvalue] = useState(
        Array(TicketData.length).fill(0))

    const [categary, SetCategary] = useState()
    const [categarytwo, SetCategarytwo] = useState()
    const [Pricecategarytwo, SetPricecategarytwo] = useState()
    const [buttonshow, setButtonshow] = useState(false)
    const [buttonname, setButtonname] = useState("Proceed")
    const [userDetails, setUserdetails] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        detailsarray.map(() => ({
            customName: "",
            email: "",
            phoneNumber: "",
            something: "",
            tshirtSize: "",
            linkedinURL: "",
            organisation: "",
            designation: "",
            receiveUpdates: false,
            institution: "",
            country: "",
        }))
    );

    const handleChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => {
            const updatedData = [...prevData];
            updatedData[index] = {
                ...updatedData[index],
                [name]: type === "checkbox" ? checked : value,
            };
            return updatedData;
        });
    };

    const handleSubmit = (index, event) => {

        if (formData.customName == "" || formData.email == "") {

            setError("Fill all mandoatry details")

        } else {
            event.preventDefault();
            const submittedData = {
                ...formData[index],
                categoryType: detailsarray[index].type, 
            };

            console.log('Submitted data for index', index, submittedData);

            userDetails.push(submittedData)

            console.log("new user details", userDetails);

        }

    };


    console.log(
        "categories", categories
    )
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
        const dateObj = new Date(dateTimeString + 'Z');

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

    const formattedStartDate = formatDateTime(events.start_date, events.start_time, events.time_zone, false);
    const formattedEndDate = formatDateTime(events.end_date, events.end_time, events.time_zone);

    console.log('Formatted Start Date:', formattedStartDate);
    console.log('Formatted End Date:', formattedEndDate);



    const handleAddClick = (index, category) => {
        const newCountValues = [...counvalue];
        newCountValues[index] += 1;
        setCountvalue(newCountValues);
        // Call your function to add to array
        arrayfunction(category);
    };

    const handleAddClickaccordion = (index, category) => {
        const newCountValues = [...accordionvalue];
        newCountValues[index] += 1;
        setAccordionvalue(newCountValues);
        // Call your function to add to array
        arrayfunction(category);
    };

    const handleIncrementaccordion = (index, category) => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", index)
        const newCountValues = [...accordionvalue];
        newCountValues[index] += 1;
        setAccordionvalue(newCountValues);
        arrayfunction(category);

    };

    const handleIncrement = (index, category) => {
        const newCountValues = [...counvalue];
        newCountValues[index] += 1;
        setCountvalue(newCountValues);
        arrayfunction(category);

    };


    const handleDecrement = (index, category) => {
        const newCountValues = [...counvalue];
        if (newCountValues[index] > 0) {
            newCountValues[index] -= 1;
            setCountvalue(newCountValues);
            removeCategory(category);

        }
    };
    const handleDecrementaccordion = (index, category) => {
        const newCountValues = [...accordionvalue];
        if (newCountValues[index] > 0) {
            newCountValues[index] -= 1;
            setAccordionvalue(newCountValues);
            removeCategory(category);

        }
    };


    const arrayfunction = (category) => {

        console.log("Abhay", category)

        detailsarray.push(category)
        console.log("detailsarrya", detailsarray)

        const countFreeTickets = (detailsarray.filter(item => item.type.trim() === 'Free Ticket').length)
        const countPaidTicket = (detailsarray.filter(item => item.type.trim() === 'Paid Ticket').length)
        const countTicketWithCoupon = (detailsarray.filter(item => item.type.trim() === 'Ticket With Coupon').length)
   

        setFeetickerprice(countFreeTickets)
        setPaidtickets(countPaidTicket)
        setTicketWithCoupon(countTicketWithCoupon)
        const priceofpaidtickets = (countPaidTicket) * 1000
        const priceofcouponticket = (countTicketWithCoupon) * 1000

        console.log("priceofpaidtickets", priceofpaidtickets)
        console.log("priceofcouponticket", priceofcouponticket)

        setPriceofpaidtickets(priceofpaidtickets)
        setPriceofcouponticket(priceofcouponticket)

        const subtotal = (priceofpaidtickets) + (priceofcouponticket)
        console.log("subtotal", subtotal)
        setSubtotal((subtotal))

        console.log("Category!!!!!!!!!!!!!!:", detailsarray);
        console.log("Number of 'countPaidTicket Ticket':", countPaidTicket);
        console.log("Number of 'Free countTicketWithCoupon':", countTicketWithCoupon);

        ;

    }


    const removeCategory = (categoryToRemove) => {
        const index = detailsarray.findIndex(category => category.type === categoryToRemove.type);

        if (index !== -1) {
            detailsarray.splice(index, 1);
            console.log("Updated detailsarray", detailsarray);
            const countFreeTickets = Number(detailsarray.filter(item => item.type.trim() === 'Free Ticket').length)
            const countPaidTicket = Number(detailsarray.filter(item => item.type.trim() === 'Paid Ticket').length)
            const countTicketWithCoupon = Number(detailsarray.filter(item => item.type.trim() === 'Ticket With Coupon').length)
            
            setFeetickerprice(countFreeTickets)
            setPaidtickets(countPaidTicket)
            setTicketWithCoupon(countTicketWithCoupon)

            const priceofpaidtickets = Number(countPaidTicket) * 1000
            const priceofcouponticket = Number(countTicketWithCoupon) * 1000
   
            setPriceofpaidtickets(priceofpaidtickets)
            setPriceofcouponticket(priceofcouponticket)

            const subtotal = Number(priceofpaidtickets) + Number(priceofcouponticket) + Number(donationvalue)
            setSubtotal(Number(subtotal))
          
        } else {
            console.log("Category not found in detailsarray");
        }
    };



    const freeTicketsCount = detailsarray.reduce((count, category) => {
        return category.type === 'Free Ticket' ? count + 1 : count;
    }, 0);
    const paidTicketsCount = detailsarray.reduce((count, category) => {
        return category.type === 'Paid Ticket' ? count + 1 : count;
    }, 0);
    const donationTicketsCount = detailsarray.reduce((count, category) => {
        return category.type === 'Donation Ticket' ? count + 1 : count;
    }, 0);
    const couponTicketsCount = detailsarray.reduce((count, category) => {
        return category.type === 'Ticket With Coupon' ? count + 1 : count;
    }, 0);


    const onclickfunctin = () => {
        setButtonshow(true);
        setButtonname("Checkout");
        console.log("buttonname", buttonname);

        if (buttonname == "Checkout") {

            if (userDetails.length == 0) {

                setError("please submit the form first")

            } else {
                setButtonname("Register")

            }
         
        }
    }
    return (
        <div style={{ padding: "30px 50px" }}>
            <div style={{ textAlign: "start" }}>
                <div classname="my_arroww" style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-around", textAlign: "left" }}>
                    <div className="arrow_background" aria-hidden="true" onClick={() => {
                        if (buttonname == "checkout") {

                            console.log("buttonname", buttonname);

                            console.log("iffffff");
                            setButtonname("Proceed")
                            setButtonshow(false)

                        } else if (buttonshow === true) {
                            console.log("elseeeeeeee");
                            console.log("buttonname", buttonname);

                            setButtonname("checkout")

                        } else (

                            navigate("/")
                        )
                    }}>
                        <IoMdArrowBack style={{ fontSize: "24px" }} />
                    </div>

                    <div className="checkout_head">
                        <h3 className="font_sizr">{events.name}</ h3 >
                        <span style={{ fontWeight: "bold" }}><SlCalender style={{ marginTop: "-7px", fontSize: "16px" }} />
                        </span> <span style={{ fontSize: "19px", marginLeft: "18px" }}>{formattedStartDate} - {formattedEndDate} </span>
                    </div>
                </div>
            </div>

            <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-lg-9 col-md-6 col-sm-6  ">
                    <div className="contaner class_col9">
                        <div className="row">
                            <div className="col-lg-2 class_colnew9 ">

                                {buttonshow == false ? (<div >
                                    <div className="main_logo" >

                                        <div className="background">
                                            <div className="int_bg">
                                                <LuTicket />

                                            </div>


                                        </div>
                                    </div>
                                </div>) : (<div className="main_logo" >

                                    <div className="background">
                                        <div className="int_bg">
                                            <MdOutlineDone />

                                        </div>


                                    </div>
                                </div>)}


                                <div className="v2">

                                    <div className={buttonshow == true ? "bewv1" : "v1"}></div>
                                </div>


                                <div className="main_logo" >

                                    <div className="background">
                                        <div className={buttonshow == true ? "int_bg" : "int_bggg"} >
                                            <GrGroup />

                                        </div>
                                    </div>
                                </div>

                                <div className="v2">
                                    <div className={buttonname == "Register" ? "bewv1" : "v1"}></div>
                                </div>
                                <div className="main_logo" >
                                    <div className="background">
                                        <div className={buttonname == "Register" ? "int_bg" : "int_bggg"}>
                                            <MdOutlinePayment />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-10 my_col_padd mycalendar" style={{ height: "613px", display: buttonshow == true ? "none" : "block" }}>

                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={""}
                                    // onChange={handleInputChange}
                                    className="search-input"

                                />
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
                                                            className="btn btn-dark adding"
                                                            type="button"
                                                            style={{ display: dinationbtn == false ? "none" : "block" }}

                                                            onClick={() => {
                                                                setDontaionbtn(false);
                                                                // handleAddClick(index, category)
                                                                setDonationvalue("10")
                                                            }}
                                                        >
                                                            Donate
                                                        </button>
                                                        {/* <div style={{ display: dinationbtn == false ? "block" : "none", width:"45%" }}> */}
                                                        {dinationbtn == false ? <div className="donationn" >
                                                            <MdCurrencyRupee />

                                                            <input className="my_input" style={{ display: dinationbtn == false ? "block" : "none", border: "none", width: "65%" }} type="number" class="donation-amount " min="10" value={donationvalue} onChange={(e) => { setDonationvalue(e.target.value); arrayfunction(category, e.target.value) }}></input>
                                                            <div style={{ cursor: "pointer" }} aria-hidden="true" onClick={() => { setDontaionbtn(true); setDonationvalue("") }}>X</div>

                                                        </div> : ""}

                                                    </div>

                                                ) : (
                                                    <div>
                                                        {counvalue[index] < 1 ? (
                                                            <button
                                                                className="btn btn-dark adding"
                                                                type="button"
                                                                onClick={() => handleAddClick(index, category)}
                                                            >
                                                                Add
                                                            </button>
                                                        ) : (
                                                            <div className="counterui">
                                                                <CiCircleMinus
                                                                    className="mycirclee"
                                                                    onClick={() => handleDecrement(index, category)}
                                                                />
                                                                <div className="countvalue">{counvalue[index]}</div>
                                                                <CiCirclePlus
                                                                    className="mycirclee"
                                                                    onClick={() => handleIncrement(index, category)}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="accordion" id="accordionExample">
                                    {TicketData.map((category, index) => (
                                        <div className="accordion-item" key={index}>
                                            <h5 className="accordion-header" id={`heading${index}`}>
                                                <button
                                                    className={`accordion-button ${category.expandedByDefault ? "" : "collapsed"
                                                        }`}
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse${index}`}
                                                    aria-expanded={category.expandedByDefault}
                                                    aria-controls={`collapse${index}`}
                                                >
                                                    <h5 style={{ fontSize: "16px" }}> {category.categoryName}</h5>
                                                </button>
                                            </h5>
                                            <div
                                                id={`collapse${index}`}
                                                className={`accordion-collapse collapse ${category.expandedByDefault ? "show" : ""
                                                    }`}
                                                aria-labelledby={`heading${index}`}
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <p style={{ textAlign: "left" }}>{category.categoryDescription}</p>
                                                    {category.tickets.map((ticket, idx) => (

                                                        <div key={idx} className="card new_card ticket-item">

                                                            <h6 style={{ textAlign: "left" }}>{ticket.ticketName}</h6>
                                                            <p className="additional" style={{ textAlign: "left" }}>{ticket.ticketDescription}</p>
                                                            <p className="additional" style={{ textAlign: "left", marginBottom: "0px" }}><spna><IoLocationSharp style={{ color: "rgb(13 110 253)", fill: "rgb(13 110 253)" }} />
                                                            </spna><a href="https://www.google.com/maps/search/?api=1&query=KonfHub+Technologies,+Nagavarapalya,+C+V+Raman+Nagar,+Bengaluru,+Karnataka,+India">KonfHub Technologies, Nagavarapalya, C V Raman Nagar, Bengaluru, Karnataka, India.</a>
                                                            </p>
                                                            <div className="add_btn">
                                                                <p style={{ marginBottom: "0px", fontSize: "24px", fontWeight: "500" }}>
                                                                    {ticket.ticketType === "Paid"
                                                                        ? <span>{ticket.price}</span>
                                                                        : "Free"}
                                                                </p>
                                                                <div>
                                                                    <div>
                                                                        {accordionvalue[idx] < 1 ? (
                                                                            <button
                                                                                className="btn btn-dark adding"
                                                                                type="button"
                                                                                onClick={() => handleAddClickaccordion(idx, ticket)}
                                                                            >
                                                                                Add
                                                                            </button>
                                                                        ) : (
                                                                            <div className="counterui">
                                                                                <CiCircleMinus
                                                                                    className="mycirclee"
                                                                                    onClick={() => handleDecrementaccordion(idx, ticket)}
                                                                                />
                                                                                <div className="countvalue">{accordionvalue[idx]}</div>
                                                                                <CiCirclePlus
                                                                                    className="mycirclee"
                                                                                    onClick={() => handleIncrementaccordion(idx, ticket)}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                    
                            <div className="col-lg-10 my_col_padd mycalendar" style={{ height: "613px", display: buttonshow === true && buttonname !== "Register" ? "block" : "none", }} >

                                {detailsarray.map((categoryy, index) => (

                                    <div className="card new_card" key={index} >
                                        <form onSubmit={(e) => handleSubmit(index, e)}>

                                            <h5 style={{ textAlign: "left" }}> {categoryy.type} <span>
                                                {categoryy.type === 'Free Ticket' && (
                                                    <span>(1 of {freeTicketsCount} )</span>
                                                )}
                                                {categoryy.type === 'Paid Ticket' && (
                                                    <span> (1 of {paidTicketsCount} )</span>
                                                )}
                                                {categoryy.type === 'Donation Ticket' && (
                                                    <span> (1 of {donationTicketsCount} )</span>
                                                )}
                                                {categoryy.type === 'Ticket With Coupon' && (
                                                    <span> (1 of {couponTicketsCount} )</span>
                                                )}
                                            </span>  </h5>

                                            <div className="form-group">
                                                <label htmlFor="customName">Custom Name</label><span style={{ color: "red" }}>*</span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="customName"
                                                    name="customName"
                                                    value={formData.customName}
                                                    onChange={(e) => handleChange(index, e)}

                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email Address</label><span style={{ color: "red" }}>*</span>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleChange(index, e)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phoneNumber">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    value={formData.phoneNumber}
                                                    onChange={(e) => handleChange(index, e)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="something">Something</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="something"
                                                    name="something"
                                                    value={formData.something}
                                                    onChange={(e) => handleChange(index, e)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="tshirtSize">T Shirt Size</label>
                                                <select
                                                    className="form-control"
                                                    id="tshirtSize"
                                                    name="tshirtSize"
                                                    value={formData.tshirtSize}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="S">S</option>
                                                    <option value="M">M</option>
                                                    <option value="L">L</option>
                                                    <option value="XL">XL</option>
                                                    <option value="XXL">XXL</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="linkedinURL">LinkedIn URL</label>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    id="linkedinURL"
                                                    name="linkedinURL"
                                                    value={formData.linkedinURL}
                                                    onChange={(e) => handleChange(index, e)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="organisation">Organisation</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="organisation"
                                                    name="organisation"
                                                    value={formData.organisation}
                                                    onChange={(e) => handleChange(index, e)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="designation">Designation</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="designation"
                                                    name="designation"
                                                    value={formData.designation}
                                                    onChange={(e) => handleChange(index, e)}
                                                />
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="receiveUpdates"
                                                    name="receiveUpdates"
                                                    checked={formData.receiveUpdates}
                                                    onChange={(e) => handleChange(index, e)}
                                                />
                                                <label className="form-check-label" htmlFor="receiveUpdates">
                                                    I would like to receive updates & notifications from this event organizer.
                                                </label>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="institution">Institution</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="institution"
                                                    name="institution"
                                                    value={formData.institution}
                                                    onChange={(e) => handleChange(index, e)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="country">Country</label>
                                                <select
                                                    className="form-control"
                                                    id="country"
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={(e) => handleChange(index, e)}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="India">India</option>
                                                    <option value="USA">USA</option>
                                                    <option value="UK">UK</option>
                                                    {/* Add more countries as needed */}
                                                </select>
                                            </div>
                                       
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </form>

                                    </div>
                                ))}
                            </div>
                            <div className="col-lg-10 my_col_padd mycalendar" style={{ height: "613px", display: buttonname == "Register" ? "block" : "none", }} >

                                <div className="accordion" id="userAccordion">
                                    {userDetails.map((user, index) => (
                                        <div className="accordion-item " key={index}>
                                            <h2 className="accordion-header" style={{ backgroundColor: "#f6f6fc" }} id={`heading${index}`}>
                                                <button
                                                    className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse${index}`}
                                                    aria-expanded={index === 0}
                                                    aria-controls={`collapse${index}`}
                                                >
                                                    {user.categoryType}
                                                </button>
                                            </h2>
                                            <div
                                                id={`collapse${index}`}
                                                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                                                aria-labelledby={`heading${index}`}
                                                data-bs-parent="#userAccordion"
                                            >
                                                <div className="accordion-body" style={{ backgroundColor: "#f6f6fc" }}>
                                                    <div className="card new_card">
                                                        <p style={{ textAlign: "left", marginBottom: "0px" }}><strong>{user.customName}</strong>  </p>
                                                        <p style={{ textAlign: "left", fontWeight: "600", color: "#b4b4b4" }}>{user.email}</p>

                                                        <div className="my_check_accordion">
                                                            <div>
                                                                <p style={{ textAlign: "left" }}><strong>Country:</strong>  {user.country}</p>
                                                                <p style={{ textAlign: "left" }}><strong>Designation:</strong> {user.designation}</p>
                                                                <p style={{ textAlign: "left" }}><strong>Institution:</strong> {user.institution}</p>
                                                                <p style={{ textAlign: "left" }}><strong>LinkedIn URL:</strong> {user.linkedinURL || "N/A"}</p>

                                                            </div>
                                                            <div>
                                                                <p style={{ textAlign: "left" }}><strong>Organisation:</strong> {user.organisation}</p>
                                                                <p style={{ textAlign: "left" }}><strong>Phone Number:</strong> {user.phoneNumber}</p>
                                                                <p style={{ textAlign: "left" }}><strong>Receive Updates:</strong> {user.receiveUpdates ? "Yes" : "No"}</p>
                                                                <p style={{ textAlign: "left" }}><strong>Something:</strong> {user.something}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

                {/* end */}
                {detailsarray.length == 0 ? (
                    <div className="col-lg-3 col-md-6 col-sm-12 class_col99 disabled">
                        <div className="contaner my_cont">
                            <MdOutlineShoppingCartCheckout style={{ fontSize: "81px", color: "#572148" }} />

                            <p className="checkout_desc">You haven't selected any ticket. Select a ticket to see the ticket summary.</p>

                        </div>

                        <button
                            className="btn btn-dark proceed_btn"
                            type="button"
                            onClick={() => { setButtonshow(true); setButtonname("Checkout") }}
                            style={{ width: "100%", display: buttonshow == true ? "none" : "block" }}
                        >
                            {buttonname}
                        </button>

                    </div>) : (
                    <div className="col-lg-3 col-md-6 col-sm-12 class_col99 ">
                        <div className="contaner my_cont_sec">

                            <div>
                                <h5 style={{ fontSize: "20px" }}>Ticket Summary</h5>

                                {freeticketprice ? <div className="tickets_details_main">
                                    <p classsName="tickets_details my_details">Free Ticket</p>
                                    <p classsName="tickets_details" >x {freeticketprice}</p>
                                </div> : ""}

                                {paidetickets ? <div className="tickets_details_main">
                                    <p classsName="tickets_details my_details">Paid Ticket</p>
                                    <p classsName="tickets_details" >x {paidetickets}</p>
                                    <p classsName="tickets_details" > {priceofpaidtickets}</p>

                                </div> : ""}

                                {ticketWithCoupon ? <div className="tickets_details_main">
                                    <p classsName="tickets_details my_details">Ticket With Coupon</p>
                                    <p classsName="tickets_details" >x {ticketWithCoupon}</p>
                                    <p classsName="tickets_details" > {priceofcouponticket}</p>

                                </div> : ""}

                                {donationvalue ? <div className="tickets_details_main">
                                    <p classsName="tickets_details my_details">Donation Ticket</p>
                                    <p classsName="tickets_details" >x {donationvalue}</p>
                                    <p classsName="tickets_details" > {donationvalue}</p>

                                </div> : ""}

                                {categary ? <div className="tickets_details_main">
                                    <p classsName="tickets_details my_details">Free Ticket</p>
                                    <p classsName="tickets_details" >x {categary}</p>
                                </div> : ""}

                                {categarytwo ? <div className="tickets_details_main">
                                    <p classsName="tickets_details my_details">Category 2</p>
                                    <p classsName="tickets_details" >x {categarytwo}</p>
                                    <p classsName="tickets_details" > {Pricecategarytwo}</p>

                                </div> : ""}
                                {donationvalue || ticketWithCoupon || paidetickets ? <div className="tickets_details_main">
                                    <p classsName="tickets_details my_details">Sub Total</p>

                                    <p classsName="tickets_details" > {subtotal + donationvalue}</p>

                                </div> : ""}

                                {donationvalue || ticketWithCoupon || paidetickets ?
                                    <div className="tickets_details_main">
                                        <p classsName="tickets_details my_details">Total</p>

                                        <p classsName="tickets_details" > {subtotal + donationvalue}</p>

                                    </div> : <div className="tickets_details_main" >
                                        <p classsName="tickets_details my_details">Total</p>

                                        <p classsName="tickets_details" > Free </p>

                                    </div>}
                            </div>

                        </div>
                        <button
                            className="btn btn-dark proceed_btn "
                            type="button"
                            onClick={() => { onclickfunctin() }}
                            style={{ width: "100%" }}
                        >
                            {buttonname}
                        </button>

                        <span style={{ color: "red" }}>{error}</span>


                    </div>)}




            </div>
        </div>








    );
};

export default CategoryList;

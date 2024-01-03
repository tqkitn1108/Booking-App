import React, { useContext, useEffect, useState } from 'react';
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faShuttleVan, faParking, faCheckCircle, faLock, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import cvcCodeImage from './cvcCodeImage.png';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/AxiosConfig'
import Navbar from '../../components/navbar/Navbar';

const GoodToKnow = () => {
    return (
        <div className="Good">
            <h4> Good to know </h4>
            <div className='no credit'>
                <p><FontAwesomeIcon icon={faCheckCircle} /> No credit card needed! </p>
                <p><FontAwesomeIcon icon={faCheckCircle} /> Stay flexible: You can cancel for free at any time, so lock in   this great price today .</p>
                <p><FontAwesomeIcon icon={faCheckCircle} /> No payment needed today. You'll pay when you stay. </p>
            </div>
        </div>
    );
};

const SecurePage = ({ hotelId, location }) => {
    const { user } = useContext(AuthContext);

    const formik = useFormikContext();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const completeBooking = async (values) => {
        const requestData = {
            // cardName: values.cardName,
            // cardType: values.cardType,
            // cardNumber: values.cardNumber,
            // cvcCode: values.cvcCode,
            // expirationDate: values.expirationDate,
            fullName: values.firstname + ' ' + values.lastname,
            phoneNumber: values.telephone,
            email: values.email,
            roomIds: location.state?.roomList,
            totalPrice: location.state?.totalPrice,
            adults: searchParams.get('adults'),
            children: searchParams.get('children'),
            checkInDate: searchParams.get('checkIn'),
            checkOutDate: searchParams.get('checkOut')
        };

        try {
            await api.post(`/bookings/hotels/${hotelId}`, requestData);
            alert("Thông tin đặt phòng đã được gửi đi. Mọi thông tin về thông tin đặt phòng sẽ được gửi về email ngay khi khách sạn xác nhận. Vui lòng thường xuyên kiểm tra email của bạn!");
            navigate("/");
        } catch (err) {
            console.log(err);
        }

    };
    const initialValues = {
        // cardName: '',
        // cardType: '',
        // cardNumber: '',
        // cvcCode: '',
        // expirationDate: '',
        firstname: '',
        lastname: '',
        telephone: '',
        email: user?.userEmail || '',
    };

    const validate = (values) => {
        const errors = {};

        // if (!values.cardName) {
        //     errors.cardName = 'Cardholder\'s name is required';
        // } else if (!/^[^\d]+$/.test(values.cardName)) {
        //     errors.cardName = 'Cardholder\'s name should not contain numbers';
        // }

        // if (!values.cardType) {
        //     errors.cardType = 'Card type is required';
        // }

        // if (!values.cardNumber) {
        //     errors.cardNumber = 'Card number is required';
        // } else if (!/^\d+$/.test(values.cardNumber)) {
        //     errors.cardNumber = 'Card number should only contain numbers';
        // }

        // if (!values.cvcCode) {
        //     errors.cvcCode = 'CVC code is required';
        // } else if (!/^\d+$/.test(values.cvcCode)) {
        //     errors.cvcCode = 'Invalid CVC code';
        // }

        // if (!values.expirationDate) {
        //     errors.expirationDate = 'Expiration date is required';
        // } else {
        //     const currentDate = new Date();
        //     const inputDate = new Date(values.expirationDate);
        //     if (inputDate < currentDate) {
        //         errors.expirationDate = 'Expiration date should be in the future';
        //     }
        // }
        if (!values.firstname) {
            errors.firstname = 'First name is required';
        }

        if (!values.lastname) {
            errors.lastname = 'Last name is required';
        }

        if (!values.telephone) {
            errors.telephone = 'Telephone is required';
        } else if (!/^\d+$/.test(values.telephone)) {
            errors.telephone = 'Invalid telephone number';
        }

        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };

    const cardTypes = ['Visa', 'MasterCard', 'American Express', 'Discover'];

    return (
        <div>
            <div className='dad'>
                <div className='Login template'>
                    <div className='form_container p-9 rounded bg-white'>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={completeBooking}
                            validate={validate}
                        >
                            <Form className='form-secure'>
                                {/* <div className='Login template d-flex flex-column w-75 bg-white mt'> */}

                                <div className='mb-2 d-grid'>
                                    <div className='ad1 mb-2' >
                                        <h3 className='text-right'>Enter your details</h3>
                                        <div className=' name form-group d-flex w-100 mb-3 '>
                                            <div className=' m-right' style={{ width: '349px' }}>
                                                <label htmlFor='firstname' className='form-label' style={{ fontWeight: 'bold' }}>
                                                    First Name <span className="required text-danger">*</span>
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="firstname"
                                                    placeholder='Enter first name'
                                                    className='form-control'
                                                />
                                                <ErrorMessage name="firstname" component="span" className='form-message' style={{ color: 'red' }} />
                                            </div>
                                            <div className='m-lef ' style={{ marginLeft: '2rem', width: '315px' }}>
                                                <label htmlFor='lastname' className='form-label' style={{ fontWeight: 'bold' }}>
                                                    Last Name <span className="required text-danger">*</span>
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="lastname"
                                                    placeholder='Enter last name'
                                                    className='form-control'
                                                />
                                                <ErrorMessage name="lastname" component="span" className='form-message' style={{ color: 'red' }} />
                                            </div>
                                        </div>

                                        <div className='mb-3 w-50'>
                                            <label htmlFor='telephone' className='form-label ' style={{ fontWeight: 'bold' }}>
                                                Telephone <span className="required text-danger">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                name="telephone"
                                                placeholder='Enter telephone'
                                                className='form-control'
                                            />
                                            <ErrorMessage name="telephone" component="span" className='form-message' style={{ color: 'red' }} />
                                        </div>
                                        <div className='mb-3 w-50'>
                                            <label htmlFor='email' className='form-label' style={{ fontWeight: 'bold' }}>
                                                Email <span className="required text-danger">*</span>
                                            </label>
                                            <Field
                                                type="email"
                                                name="email"
                                                readOnly={user !== null}
                                                placeholder='Enter email'
                                                className='form-control'
                                            />
                                            <ErrorMessage name="email" component="span" className='form-message' style={{ color: 'red' }} />
                                        </div>
                                        <div className="booking-for-section mt-3">
                                            <p className="mb-2" style={{ fontWeight: 'bold' }}>Who are you booking for?</p>
                                            <div className="form-check mb-2">
                                                <input type="radio" id="mainGuest" name="bookingFor" className="form-check-input" />
                                                <label htmlFor="mainGuest" className="form-check-label">I'm the main guest</label>
                                            </div>
                                            <div className="form-check mb-2">
                                                <input type="radio" id="someoneElse" name="bookingFor" className="form-check-input" />
                                                <label htmlFor="someoneElse" className="form-check-label">I'm booking for someone else</label>
                                            </div>
                                        </div>
                                        <div className="traveling-for-work mt-3">
                                            <p className="mb-2" style={{ fontWeight: 'bold' }}>Are you traveling for work?</p>
                                            <div className="form-check form-check-inline mb-2">
                                                <input type="radio" id="yes" name="travelingForWork" className="form-check-input" />
                                                <label htmlFor="Ayes" className="form-check-label">Yes</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input type="radio" id="no" name="travelingForWork" className="form-check-input" />
                                                <label htmlFor="Ano" className="form-check-label">No</label>
                                            </div>
                                        </div>
                                    </div>
                                    <GoodToKnow />
                                    {/* <div className='ad2'>
                                        <h3 className='text-right'>How do you want to pay</h3>
                                        <div className='mb-3 w-75'>
                                            <label htmlFor='cardName' className='form-label ' style={{ fontWeight: 'bold' }}>
                                                Cardholder's name <span className="required text-danger">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                name="cardName"
                                                placeholder="Enter cardholder"
                                                className='form-control'
                                            />
                                            <ErrorMessage name="cardName" component="span" className='form-message' style={{ color: 'red' }} />
                                        </div>
                                        <div className='mb-3 w-75'>
                                            <label htmlFor='cardType' className='form-label' style={{ fontWeight: 'bold' }}>
                                                Card type <span className="required text-danger">*</span>
                                            </label>
                                            <Field
                                                as="select"
                                                name="cardType"
                                                className='form-select'
                                            >
                                                <option value=''>Select Card Type</option>
                                                {cardTypes.map((type, index) => (
                                                    <option key={index} value={type}>{type}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="cardType" component="span" className='form-message' style={{ color: 'red' }} />
                                        </div>
                                        <div className='mb-3 w-75 '>
                                            <label htmlFor='cardNumber' className='form-label' style={{ fontWeight: 'bold' }}>
                                                Card Number <span className="required text-danger">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                name="cardNumber"
                                                placeholder='Enter cardnumber'
                                                className='form-control'
                                            />
                                            <ErrorMessage name="cardNumber" component="span" className='form-message' style={{ color: 'red' }} />
                                        </div>
                                        <div className='mb-3 w-75'>
                                            <label htmlFor='cvcCode' className='form-label' style={{ fontWeight: 'bold' }}>
                                                CVC Code <span className="required text-danger">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                name="cvcCode"
                                                placeholder='Enter CVC code'
                                                className='form-control'
                                            />
                                            <ErrorMessage name="cvcCode" component="span" className='form-message' style={{ color: 'red' }} />
                                        </div>
                                        <div className='mb-2'>
                                            <label className='form-label'></label>
                                            <div className='mb-2'>
                                                <label className='form-label'></label>
                                                <img src={cvcCodeImage} alt="CVC Code Image" />
                                            </div>
                                        </div>
                                        <div className='mb-2 w-75'>
                                            <label htmlFor='expirationDate' className='form-label' style={{ fontWeight: 'bold' }}>
                                                Expiration Date <span className="required text-danger" >*</span>
                                            </label>
                                            <Field
                                                type="date"
                                                name="expirationDate"
                                                className='form-control'
                                            />
                                            <ErrorMessage name="expirationDate" component="span" className='form-message' style={{ color: 'red' }} />
                                        </div>
                                    </div> */}
                                    <div className="submit-button mt-3">
                                        <button type="submit" className="btn btn-primary">
                                            Complete Booking
                                        </button>
                                    </div>
                                </div>
                                {/* </div> */}
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div >
    );
};



const ReservationPage = () => {
    const location = useLocation();
    const state = location.state;
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState({});

    useEffect(() => {
        async function loadHotelData() {
            try {
                const response = await api.get(`/business/hotels/${hotelId}`);
                setHotel(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        loadHotelData();
    }, [])


    return (
        <div>
            <Navbar />
            <div className="content-container align-items-center">
                <div className="reservation-container" >
                    <div className='check'>
                        <div className="hotel-information">
                            <div className="hotel-info-border">
                                <h5>{hotel.name}</h5>
                                <p className=''>Address: 123 Main Street, Cityville</p>
                                <div className='d-flex'  > Rating:
                                    <div className="siRating">
                                        <button>8.9</button>
                                    </div>
                                </div>
                                <div className="amenities">
                                    <div className="wifi">
                                        <FontAwesomeIcon icon={faWifi} />
                                        <span> Free WiFi</span>
                                    </div>
                                    <div className="shuttle">
                                        <FontAwesomeIcon icon={faShuttleVan} />
                                        <span> Shuttle Service</span>
                                    </div>
                                </div>
                                <div className="parking">
                                    <FontAwesomeIcon icon={faParking} />
                                    <span> Parking</span>
                                </div>
                            </div>
                        </div>

                        <div className="hotel-detail-border" >
                            <h5>Your booking details</h5>
                            <p style={{ fontWeight: 'bold' }}> Check-in: <span className='check-in'> Mon 8 Jan 2024 </span> </p>
                            <p style={{ fontWeight: 'bold' }}> Check-out: <span className='check-out'> Fri 12 Jan 2024 </span></p>
                            <p style={{ fontWeight: 'bold' }}> Total length of stay: <span className='totalStays'> {state?.stayLength} nights </span> </p>
                            <span className="text-success"> Change your selection </span>
                        </div>

                        <div className='total-summary'>
                            <h4>Your price summary <span className='unit'> (VND)</span></h4>

                            <div className=' p-3 mb-3' style={{ backgroundColor: '#ADD8E6' }}>
                                <h2 className='tp'>
                                    Total: <span className="total-price">{state?.totalPrice.toLocaleString('vi-VN')}</span>
                                </h2>
                            </div>

                            <div className="priceInfor bg-light p-3">
                                <h5>Price Information</h5>
                                <p>
                                    <FontAwesomeIcon icon={faMoneyBill} className="mr-3" />
                                    Include VND <span className='vat'>{Math.round(state?.totalPrice / 11)}</span> in taxes <br /> and charges
                                </p>
                                <p>
                                    10% VAT <span className='tax'>VND 322.085</span>
                                </p>
                            </div>
                        </div>

                        <div className="Payment">
                            <h5> Your payment schedule </h5>
                            <p> You 'll be charge a payment of the total <br /> price at any time </p>
                        </div>
                    </div>
                    <div>
                        <SecurePage hotelId={hotelId} location={location} />
                        <div style={{ height: '200px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ReservationPage;


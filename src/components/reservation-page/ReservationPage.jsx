import React, { useState } from 'react';
import Check1 from './Navbar';
import './ReservationPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faShuttleVan, faParking, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Details = () => {
    return (
        <div className="hotel-detail-border" >
            <h5>Your booking details</h5>
            <p> Check-in: Mon 8 Jan 2024</p>
            <p> Check-out: Fri 12 Jan 2024</p>
            <p> Total length of stay: 4 nights </p>
            <span className="text-success"> Change your selection </span>
        </div>
    )
}
const PaymentSchedule = () => {
    return (
        <div className="Payment">
            <h5> Your payment schedule </h5>
            <p> You 'll be charge a payment of the total <br /> price at any time </p>
        </div>
    )
}

const PriceSummary = () => {
    return (
        <div className='total-summary'>
            <h4> Your price summary </h4>
            <p> Original price</p>
            <p> Last-minute price price</p>
            <h2> Total </h2>

        </div>
    )
}



const GoodToKnow = () => {
    return (
        <div className="Good">
            <h4> Good to know </h4>
            <div className='no credit'>
                <p><FontAwesomeIcon icon={faCheckCircle} /> No credit card needed! </p>
                <p><FontAwesomeIcon icon={faCheckCircle} /> Stay flexible: You can cancel for free at any time, so lock in <br />      this great price today .</p>
                <p><FontAwesomeIcon icon={faCheckCircle} /> No payment needed today. You'll pay when you stay. </p>
            </div>
        </div>
    );
};
const HotelInformation = () => {
    return (
        <div className="hotel-information">
            <div className="hotel-info-border">
                <h5>Hotel Name</h5>
                <p>Address: 123 Main Street, Cityville</p>
                <p>Rating: ⭐⭐⭐⭐</p>
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
    );
};



const SecurePage = () => {
    const [formData, setFormData] = useState({
        cardName: '',
        cardType: '',
        cardNumber: '',
        cvcCode: '',
        expirationDate: '',
    });

    const [errors, setErrors] = useState({
        cardName: '',
        cardType: '',
        cardNumber: '',
        cvcCode: '',
        expirationDate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateInput(name, value);
    };

    const validateInput = (name, value) => {
        switch (name) {
            case 'cardName':
                setErrors({
                    ...errors,
                    cardName: value.trim() === '' ? 'Cardholder\'s name is required' : '',
                });
                break;
            case 'cardType':
                setErrors({
                    ...errors,
                    cardType: value === '' ? 'Card type is required' : '',
                });
                break;
            case 'cardNumber':
                setErrors({
                    ...errors,
                    cardNumber: value.trim() === '' ? 'Card number is required' : '',
                });
                break;
            case 'cvcCode':
                setErrors({
                    ...errors,
                    cvcCode: value.trim() === '' ? 'CVC code is required' : !/^\d+$/.test(value) ? 'Invalid CVC code' : '',
                });
                break;
            case 'expirationDate':
                setErrors({
                    ...errors,
                    expirationDate: value.trim() === '' ? 'Expiration date is required' : '',
                });
                break;
            default:
                break;
        }
    };

    const isFormValid = () => {
        return Object.values(errors).every((error) => error === '') &&
            Object.values(formData).every((value) => value.trim() !== '');
    };

    const cardTypes = ['Visa', 'MasterCard', 'American Express', 'Discover'];

    return (
        <div>
            <div className='dad'>
                <div className='Login template'>
                    <div className='form_container p-9 rounded bg-white'>
                        <form className='form-secure text-left'>
                            <h3 className='text-right'>How do you want to pay</h3>
                            <div className='mb-2 d-flex'>
                                <div style={{ flex: '1', marginRight: '10px' }}>
                                    <label htmlFor='cardName'>Cardholder's name</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        placeholder=''
                                        className='form-control'
                                        onChange={handleInputChange}
                                    />
                                    <span className='form-message' style={{ color: 'red' }}>{errors.cardName}</span>
                                </div>
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='cardType'>Card type</label>
                                <select
                                    name="cardType"
                                    className='form-control'
                                    onChange={handleInputChange}
                                >
                                    <option value=''>Select Card Type</option>
                                    {cardTypes.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </select>
                                <span className='form-message' style={{ color: 'red' }}>{errors.cardType}</span>
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='cardNumber'>Card Number</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder=''
                                    className='form-control'
                                    onChange={handleInputChange}
                                />
                                <span className='form-message' style={{ color: 'red' }}>{errors.cardNumber}</span>
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='cvcCode'>CVC Code</label>
                                <input
                                    type="text"
                                    name="cvcCode"
                                    placeholder=''
                                    className='form-control'
                                    onChange={handleInputChange}
                                />
                                <span className='form-message' style={{ color: 'red' }}>{errors.cvcCode}</span>
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='expirationDate'>Expiration Date</label>
                                <input
                                    type="date"
                                    name="expirationDate"
                                    className='form-control'
                                    onChange={handleInputChange}
                                />
                                <span className='form-message' style={{ color: 'red' }}>{errors.expirationDate}</span>
                            </div>
                            {/* Add a submit button here if needed */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReservationPage = () => {
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleAgreeTermsChange = () => {
        setAgreeTerms(!agreeTerms);
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        telephone: '',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        telephone: '',
    });

    const [showErrors, setShowErrors] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
        validateInput(id, value);
    };

    const validateInput = (id, value) => {
        switch (id) {
            case 'Firstname':
                setErrors({
                    ...errors,
                    firstName: value.trim() === '' ? 'First name is required' : '',
                });
                break;
            case 'Lastname':
                setErrors({
                    ...errors,
                    lastName: value.trim() === '' ? 'Last name is required' : '',
                });
                break;
            case 'Email':
                setErrors({
                    ...errors,
                    email: value.trim() === '' ? 'Email is required' : !/^\S+@\S+\.\S+$/.test(value) ? 'Invalid email address' : '',
                });
                break;
            case 'country':
                setErrors({
                    ...errors,
                    country: value.trim() === '' ? 'Country is required' : '',
                });
                break;
            case 'telephone':
                setErrors({
                    ...errors,
                    telephone: value.trim() === '' ? 'Telephone is required' : !/^\d+$/.test(value) ? 'Invalid phone number' : '',
                });
                break;
            default:
                break;
        }
    };

    const isFormValid = () => {
        return (
            Object.values(errors).every((error) => error === '') &&
            Object.values(formData).every((value) => value.trim() !== '')
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowErrors(true);

        if (isFormValid()) {
            // Handle form submission logic here
            console.log('Form is valid. Submitting...');
            // Clear form data and errors after submission if needed
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                country: '',
                telephone: '',
            });
            setErrors({
                firstName: '',
                lastName: '',
                email: '',
                country: '',
                telephone: '',
            });
            setShowErrors(false);
        } else {
            console.log('Form is not valid. Please check errors.');
        }
    };
    return (
        <div  >
            <div className="content-container">
                <div className="reservation-container" >
                    <div>
                        <HotelInformation />
                        <Details />
                        <PriceSummary />
                        <PaymentSchedule />
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="form-container  text-left "  >
                            <div className='Login template d-flex flex-column align-items-center  w-100 bg-white mt ' >
                                <div className='form_container p-9 rounded bg-white'>
                                    <form>
                                        <h3 className='text-right'> Enter your details </h3>
                                        <div className='mb-1 d-flex'>
                                            <div className='form-group ' style={{ flex: '1', marginRight: '10px' }}>
                                                <label htmlFor='Firstname'>First Name</label>
                                                <input
                                                    id='Firstname'
                                                    type='text'
                                                    placeholder=''
                                                    className='form-control '  // Added margin-bottom here
                                                    onChange={handleInputChange}
                                                />
                                                <span className='form-message' style={{ color: 'red' }}>{errors.firstName}</span>
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor='Lastname'>Last Name</label>
                                                <input
                                                    id='Lastname'
                                                    type='text'
                                                    placeholder=''
                                                    className='form-control '  // Added margin-top here
                                                    onChange={handleInputChange}
                                                />
                                                <span className='form-message' style={{ color: 'red' }}>{errors.lastName}</span>
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='Email'>Email</label>
                                            <input
                                                id='Email'
                                                type='email'
                                                placeholder='Enter Email'
                                                className='form-control col-12'
                                                onChange={handleInputChange}
                                            />
                                            <span className='form-message' style={{ color: 'red' }}>{errors.email}</span>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='country'>Country/Region</label>
                                            <input
                                                id='country'
                                                type='text'
                                                placeholder='Country'
                                                className='form-control'
                                                onChange={handleInputChange}
                                            />
                                            <span className='form-message' style={{ color: 'red' }} >{errors.country}</span>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='telephone'>Telephone (mobile number preferred)</label>
                                            <input
                                                type='text'
                                                id='telephone'
                                                placeholder='Telephone'
                                                className='form-control'
                                                onChange={handleInputChange}
                                            />
                                            <span className='form-message' style={{ color: 'red' }} >{errors.telephone}</span>
                                        </div>
                                        <div className="booking-for-section mt-4">
                                            <p className="mb-2">Who are you booking for?</p>
                                            <div className="form-check mb-2">
                                                <input type="radio" id="mainGuest" name="bookingFor" className="form-check-input" />
                                                <label htmlFor="mainGuest" className="form-check-label">I'm the main guest</label>
                                            </div>
                                            <div className="form-check mb-2">
                                                <input type="radio" id="someoneElse" name="bookingFor" className="form-check-input" />
                                                <label htmlFor="someoneElse" className="form-check-label">I'm booking for someone else</label>
                                            </div>
                                        </div>
                                        <div className="traveling-for-work">
                                            <p className="mb-2  ">Are you traveling for work?</p>
                                            <div className="form-check form-check-inline mb-2">
                                                <input type="radio" id="yes" name="travelingForWork" className="form-check-input" />
                                                <label htmlFor="Ayes" className="form-check-label">Yes</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input type="radio" id="no" name="travelingForWork" className="form-check-input" />
                                                <label htmlFor="Ano" className="form-check-label">No</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </form>
                        <GoodToKnow />
                        <SecurePage />

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationPage;

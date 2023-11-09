import React from 'react';
import { Link } from 'react-router-dom';
import Check1 from './Navbar';


const ReservationPage = () => {
    return (

        <div >
            <Check1 />
            <div >
            
                <div className='Login template d-flex flex-column align-items-center vh-100 bg-white mt ' >
                    <div className='form_container p-9 rounded bg-white'>
                        <form>
                            <h3 className='text-right'> Enter your details </h3>
                            <div className='mb-2 d-flex'>
                                <div >
                                    <label htmlFor='Firstname'>First Name</label>
                                    <input type="fname" placeholder='' className='form-control' />
                                </div>
                                <div >
                                    <label htmlFor='Lasttname'>Last Name</label>
                                    <input type="lname" placeholder='' className='form-control' />
                                </div>
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='Email'> Email </label>
                                <input id="Email" type="email" placeholder='Enter Email' className='form-control' />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='country'> Country/Region </label>
                                <input type="Country" placeholder='Country' className='form-control' />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='country'> Telephone (mobile number preferred) </label>
                                <input type="Telephone" placeholder='Telephone' className='form-control' />
                            </div>
                            <div className='mb-2'>
                                <input type="checkbox" className='custom-control custom-checkbox' id="check" />
                                <label htmlFor='check' className='custom-input-label ms-2'>
                                    Yes, I want free paperless confirmation
                                </label>
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
                                <p className="mb-2">Are you traveling for work?</p>
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

            </div>

        </div>
    );
};

export default ReservationPage;

import React, { useState } from 'react';
import './ReservationPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faShuttleVan, faParking, faCheckCircle, faLock, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import cvcCodeImage from './cvccode-img.png';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';

const Details = () => {
    return (
        <div className="hotel-detail-border" >
            <h5>Your booking details</h5>
            <p style = {{ fontWeight: 'bold' }}> Check-in: <span className='check-in'> Mon 8 Jan 2024 </span> </p>
            <p style = {{ fontWeight: 'bold' }}> Check-out: <span className='check-out'> Fri 12 Jan 2024 </span></p>
            <p style = {{ fontWeight: 'bold' }}> Total length of stay: <span className='totalStays'> 4 nights </span> </p>
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
            <h4>Your price summary <span className='unit'> (VND)</span></h4>
            
            <div className=' p-3 mb-3' style={{ backgroundColor: '#ADD8E6' }}>
                <h2 className='tp'>
                    Total: <span className="total-price">3.542.940</span>
                </h2>
            </div>

            <div className="priceInfor bg-light p-3">
                <h5>Price Information</h5>
                <p>
                    <FontAwesomeIcon icon={faMoneyBill} className="mr-3" />
                    Include VND <span className='vat'>322.085</span> in taxes <br /> and charges
                </p>
                <p>
                    10% VAT <span className='tax'>VND 322.085</span>
                </p>
            </div>
        </div>
    );
};


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
const HotelInformation = () => {
    return (
        <div className="hotel-information">
            <div className="hotel-info-border">
                <h5>Hotel Name</h5>
                <p>Address: 123 Main Street, Cityville</p>
                <p>Rating: 9/10</p>
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

    const formik = useFormikContext();

    
    const onSubmit = (values) => {
        // Create an object with the form values
        const formData = {
            cardName: values.cardName,
            cardType: values.cardType,
            cardNumber: values.cardNumber,
            cvcCode: values.cvcCode,
            expirationDate: values.expirationDate,
        };

        // Log the object to the console
        console.log('Form Data:', formData);

        // Handle the rest of the form submission logic here
    };
    const initialValues = {
        cardName: '',
        cardType: '',
        cardNumber: '',
        cvcCode: '',
        expirationDate: '',
    };

    const validate = (values) => {
        const errors = {};

        if (!values.cardName) {
            errors.cardName = 'Cardholder\'s name is required';
        } else if (!/^[^\d]+$/.test(values.cardName)) {
            errors.cardName = 'Cardholder\'s name should not contain numbers';
        }

        if (!values.cardType) {
            errors.cardType = 'Card type is required';
        }

        if (!values.cardNumber) {
            errors.cardNumber = 'Card number is required';
        } else if (!/^\d+$/.test(values.cardNumber)) {
            errors.cardNumber = 'Card number should only contain numbers';
        }

        if (!values.cvcCode) {
            errors.cvcCode = 'CVC code is required';
        } else if (!/^\d+$/.test(values.cvcCode)) {
            errors.cvcCode = 'Invalid CVC code';
        }

        if (!values.expirationDate) {
            errors.expirationDate = 'Expiration date is required';
        } else {
            const currentDate = new Date();
            const inputDate = new Date(values.expirationDate);
            if (inputDate < currentDate) {
                errors.expirationDate = 'Expiration date should be in the future';
            }
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
                            onSubmit={onSubmit}
                            validate={validate}
                        >
                            <Form className='form-secure'>
                                <div className='Login template d-flex flex-column w-75 bg-white mt'>
                                    <h3 className='text-right'>How do you want to pay</h3>
                                    <div className='mb-2 d-grid'>
                                        <div className='mb-3'>
                                            <label htmlFor='cardName' className='form-label ' style = {{ fontWeight: 'bold' }}>
                                                Cardholder's name <span className="required text-danger">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                name="cardName"
                                                placeholder=''
                                                className='form-control'
                                            />
                                            <ErrorMessage name="cardName" component="span" className='form-message' style={{ color: 'red' }} />
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor='cardType' className='form-label' style = {{ fontWeight: 'bold' }}>
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
                                        <div className='mb-3'>
                                            <label htmlFor='cardNumber' className='form-label' style = {{ fontWeight: 'bold' }}>
                                                Card Number <span className="required text-danger">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                name="cardNumber"
                                                placeholder=''
                                                className='form-control'
                                            />
                                            <ErrorMessage name="cardNumber" component="span" className='form-message' style={{ color: 'red' }} />
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor='cvcCode' className='form-label' style = {{ fontWeight: 'bold' }}>
                                                CVC Code <span className="required text-danger">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                name="cvcCode"
                                                placeholder=''
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
                                        <div className='mb-2'>
                                            <label htmlFor='expirationDate' className='form-label' style = {{ fontWeight: 'bold' }}>
                                                Expiration Date <span className="required text-danger" >*</span>
                                            </label>
                                            <Field
                                                type="date"
                                                name="expirationDate"
                                                className='form-control'
                                            />
                                            <ErrorMessage name="expirationDate" component="span" className='form-message' style={{ color: 'red' }} />
                                        </div>
                                        <div className="submit-button mt-3">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required').matches(/^[a-zA-Z\sÀ-ỹ]*$/, 'First name should only contain letters'),
    lastName: Yup.string().required('Last name is required').matches(/^[a-zA-Z\sÀ-ỹ]*$/, 'Last name should only contain letters'),
    email: Yup.string().required('Email is required').email('Invalid email address'),
    country: Yup.string().required('Country is required'),
    telephone: Yup.string().required('Telephone is required').matches(/^\d+$/, 'Invalid phone number'),
});

const R_page = () => {

    const formik = useFormikContext();
    const handleSubmit = (values, { resetForm }) => {
        // Handle form submission logic here
        console.log('Form is valid. Submitting...');
        // You can access form values in the "values" object
        console.log('Form values:', values);

        // Clear form data after submission
        resetForm();
    };
    return (
        <div className=''>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    country: '',
                    telephone: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="form-container text-left">
                    <div className='Login template d-flex flex-column  bg-white mt'>
                        <div className='form_container p-9 rounded bg-white'>
                            <h3 className='text-right'> Enter your details </h3>
                            <div className='mb-3'>
                                <div className='name form-group d-flex w-100 mb-3 '>
                                    <div className='m-right' style={{ width: '342px' }}>
                                        <label htmlFor='firstName' className='mb-1 ' style = {{ fontWeight: 'bold' }}>
                                            First Name <span className="required text-danger">*</span>
                                        </label>
                                        <Field
                                            type='text'
                                            id='firstName'
                                            name='firstName'
                                            placeholder='Enter first name'
                                            className='form-control'
                                        />
                                        <ErrorMessage name='firstName' component='span' className='form-message' style={{ color: 'red' }} />
                                    </div>

                                    <div className='m-left' style={{ marginLeft: '2rem', width: '312px' }}>
                                        <label htmlFor='lastName' className='mb-1' style = {{ fontWeight: 'bold' }} >
                                            Last Name <span className="required text-danger">*</span>
                                        </label>
                                        <Field
                                            type='text'
                                            id='lastName'
                                            name='lastName'
                                            placeholder='Enter last name'
                                            className='form-control'
                                        />
                                        <ErrorMessage name='lastName' component='span' className='form-message' style={{ color: 'red' }} />
                                    </div>
                                </div>

                                <div className='email form-group w-50 mb-3'>
                                    <label htmlFor='email' className='mb-1' style = {{ fontWeight: 'bold' }} >
                                        Email <span className="required text-danger">*</span>
                                    </label>
                                    <Field
                                        type='email'
                                        id='email'
                                        name='email'
                                        placeholder='Enter Email'
                                        className='form-control'
                                    />
                                    <ErrorMessage name='email' component='span' className='form-message' style={{ color: 'red' }} />
                                </div>
                                <div className='country form-group w-50 mb-3'>
                                    <label htmlFor='country' className='mb-1' style = {{ fontWeight: 'bold' }} >
                                        Country/Region <span className="required text-danger">*</span>
                                    </label>
                                    <Field
                                        type='text'
                                        id='country'
                                        name='country'
                                        placeholder='Country'
                                        className='form-control'
                                    />
                                    <ErrorMessage name='country' component='span' className='form-message' style={{ color: 'red' }} />
                                </div>
                                <div className='phone form-group w-50'>
                                    <label htmlFor='telephone' className='mb-1' style = {{ fontWeight: 'bold' }}>
                                        Telephone (mobile number preferred) <span className="required text-danger">*</span>
                                    </label>
                                    <Field
                                        type='text'
                                        id='telephone'
                                        name='telephone'
                                        placeholder='Telephone'
                                        className='form-control'
                                    />
                                    <ErrorMessage name='telephone' component='span' className='form-message' style={{ color: 'red' }} />
                                </div>
                                <div className="booking-for-section mt-3">
                                    <p className="mb-2" style = {{ fontWeight: 'bold' }}>Who are you booking for?</p>
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
                                    <p className="mb-2" style = {{ fontWeight: 'bold' }}>Are you traveling for work?</p>
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
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};
// const CompleteBooking = () => {
//     const formik = useFormikContext();
  
//     const handleCompleteBooking = () => {
//         console.log('Formik:', formik); // In ra thông tin formik để kiểm tra xem có giá trị hay không
//         if (formik && formik.values) {
//           console.log('Form values:', formik.values); // In ra giá trị của formik để kiểm tra xem có giá trị hay không
//           const bookingInfo = {
//             Fullname: `${formik.values.firstName} ${formik.values.lastName}`,
//             email: formik.values.email,
//             telephone: formik.values.telephone,
//             "Cardholder's name": formik.values.cardName,
//             "Card type": formik.values.cardType,
//             "Card Number": formik.values.cardNumber,
//             "CVC Code": formik.values.cvcCode,
//             "Expiration Date": formik.values.expirationDate,
//           };
      
//           console.log('Booking Information:', bookingInfo);
//         } else {
//           console.log('formik or formik.values is undefined');
//         }
//       };
  
//     return (
//       <div className="Complete ">
//         <button className="btn btn-primary" onClick={handleCompleteBooking}>
//           <i className="fas fa-lock"></i> Complete booking
//         </button>
//       </div>
//     );
//   };
const CompleteBooking = () => {
    const formik = useFormikContext();
  
    const handleCompleteBooking = async () => {
      formik.setSubmitting(true);
      await formik.resetForm();
  
      if (formik && formik.values) {
        const bookingInfo = {
          Fullname: `${formik.values.firstName} ${formik.values.lastName}`,
          email: formik.values.email,
          telephone: formik.values.telephone,
          "Cardholder's name": formik.values.cardName,
          "Card type": formik.values.cardType,
          "Card Number": formik.values.cardNumber,
          "CVC Code": formik.values.cvcCode,
          "Expiration Date": formik.values.expirationDate,
        };
  
        console.log('Booking Information:', bookingInfo);
        formik.setSubmitting(false);
      }
    };
  
    return (
      <div className="Complete ">
        <button className="btn btn-primary" onClick={handleCompleteBooking}>
          <i className="fas fa-lock"></i> Complete booking
        </button>
      </div>
    );
  };
  
const ReservationPage = () => {
    const handleLogFormValues = (formik) => {
        console.log('Form values from SecurePage:', formik.values);
      };
    return (
      <div>
        <div className="content-container align-items-center">
          <div className="reservation-container" >
            <div>
              <HotelInformation />
              <Details />
              <PriceSummary />
              <PaymentSchedule />
            </div>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                country: '',
                telephone: '',
                cardName: '',
                cardType: '',
                cardNumber: '',
                cvcCode: '',
                expirationDate: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log('Form values submitted:', values);
              }}
            >
              {formik => (
                <div>
                  <R_page />
                  <SecurePage />
                   <CompleteBooking /> 
                  <div style={{ height: '200px' }}></div>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  };
export default ReservationPage;


// const ReservationPage = () => {
//     return (
//       <div>
//         <div className="content-container align-items-center">
//           <div className="reservation-container">
//           <div>
//                      <HotelInformation />                      
//                         <Details />
//                        <PriceSummary />
//                        <PaymentSchedule />
//                     </div>
//             <Formik
//               initialValues={{
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//                 country: '',
//                 telephone: '',
//                 cardName: '',
//                 cardType: '',
//                 cardNumber: '',
//                 cvcCode: '',
//                 expirationDate: '',
//               }}
//               validationSchema={validationSchema}
//               onSubmit={(values) => {
//                 console.log('Form values submitted:', values);
//               }}
//             >
//               {formik => (
                
//                 <div>
//                   <R_page />
//                   <SecurePage />
//                   <CompleteBooking />
//                   <div style={{ height: '200px' }}></div>
//                 </div>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     );
//   };
// const ReservationPage = () => {
//     return (
//         <div>
//             <div className="content-container align-items-center">
//                 <div className="reservation-container ">
//                     <div>
//                         <HotelInformation />
//                         <Details />
//                         <PriceSummary />
//                         <PaymentSchedule />
//                     </div>
//                     <div className=''>
//                         <R_page />
//                         <GoodToKnow />
//                         <SecurePage />
//                         <CompleteBooking />
//                         <div style={{ height: '200px' }}></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

// };
// const CompleteBooking = () => {
//     const formik = useFormikContext();

//     const handleCompleteBooking = () => {
//         // Check if formik context and values are available
//         if (formik && formik.values) {
//             // Create an object with the required information
//             const bookingInfo = {
//                 Fullname: `${formik.values.firstName} ${formik.values.lastName}`,
//                 email: formik.values.email,
//                 telephone: formik.values.telephone,
//                 "Cardholder's name": formik.values.cardName,
//                 "Card type": formik.values.cardType,
//                 "Card Number": formik.values.cardNumber,
//                 "CVC Code": formik.values.cvcCode,
//                 "Expiration Date": formik.values.expirationDate,
//             };

//             // Log the object to the console
//             console.log('Booking Information:', bookingInfo);

//             // Handle the rest of the booking logic here
//         }
//     };

//     return (
//         <div className="Complete ">
//             {/* Trigger the handleCompleteBooking function when the button is clicked */}
//             <button className="btn btn-primary" onClick={handleCompleteBooking}>
//                 <i className="fas fa-lock"></i> Complete booking
//             </button>
//         </div>
//     );
// };
// const CompleteBooking = () => {
//     const formik = useFormikContext();
  
//     const handleCompleteBooking = () => {
//       if (formik && formik.values) {
//         const bookingInfo = {
//           Fullname: `${formik.values.firstName} ${formik.values.lastName}`,
//           email: formik.values.email,
//           telephone: formik.values.telephone,
//           "Cardholder's name": formik.values.cardName,
//           "Card type": formik.values.cardType,
//           "Card Number": formik.values.cardNumber,
//           "CVC Code": formik.values.cvcCode,
//           "Expiration Date": formik.values.expirationDate,
//         };
  
//         console.log('Booking Information:', bookingInfo);
  
//         // Handle the rest of the booking logic here
//       }
//     };
  
//     return (
//       <div className="Complete ">
//         <button className="btn btn-primary" onClick={handleCompleteBooking}>
//           <i className="fas fa-lock"></i> Complete booking
//         </button>
//       </div>
//     );
//   };
import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import * as Yup from 'yup'; // Import Yup for validation
import { Nav } from 'react-bootstrap';

const validationSchema = Yup.object().shape({
  enterEmail: Yup.string().email('Invalid email address').required('Email is required'),
  enterPassword: Yup.string().required('Password is required'),
});


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const customStyle = {
    input: {
      fontSize: '1rem',
      padding: '0.5rem 1rem',
    },
    label: {
      fontSize: '1rem',
    },
    button: {
      fontSize: '20px',
      fontWeight: '450',
    },
    formGroup: {
      marginBottom: '1rem',
    },
    socialButton: {
      fontSize: '16px', // Adjust the font size as needed
      fontWeight: '500', // Adjust the font weight as needed
    },
  };
  const customInputStyle = {
    width: '100%',    // Đặt chiều rộng là 100%
    height: '50px',   // Đặt chiều cao mong muốn
    /* Các thuộc tính CSS khác tùy ý */
  };

  // const handleSubmit = (values, { resetForm }) => {
  //   console.log('Form is valid. Submitting...');
  //   console.log('Form values:', values);
  //   resetForm();
  // };
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Validate the form using Yup schema
      await validationSchema.validate(values, { abortEarly: false });

      // If validation passes, proceed with form submission
      const formData = {
        Email: values.enterEmail,
        Password: values.enterPassword,
      };

      console.log('Form values:', formData);
      resetForm();
    } catch (error) {
      // If validation fails, handle the error (e.g., display error messages)
      console.error('Form validation error:', error);
    }
  };
  return (
    <div> 
    <Navbar/>
    <Formik
      initialValues={{
        enterEmail: '',
        enterPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => (
      <Form>
        <MDBContainer fluid>
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
              <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                  <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                  <div className='mb-3'>
                    <label className="mb-1" htmlFor="enterEmail">
                      Email address <span className="required text-danger">*</span>{' '}
                    </label>
                    <Field
                      wrapperClass='mb-4 w-100'
                      id='enterEmail'
                      type='email'
                      name='enterEmail'
                      size="lg"
                      className='form-control rounded border-1'
                      style={customInputStyle}
                    />
                    <ErrorMessage name='enterEmail' component='div' className='form-message text-danger' />
                  </div>
                  <div className='mb-2'>
                    <label className="mb-1" htmlFor='enterPassword'>
                      Password <span className="required text-danger">*</span>{' '}
                    </label>
                    <div className='position-relative'>
                      <Field
                        wrapperClass='mb-4 w-100' // Loại bỏ pr-5 từ đây
                        id='enterPassword'
                        type={showPassword ? 'text' : 'password'}
                        name='enterPassword'
                        size="lg"
                        className='form-control rounded border-1'
                        style={customInputStyle}
                      />
                      <span
                        className='position-absolute end-0 top-50 translate-middle-y cursor-pointer'
                        style={{ paddingRight: '15px' }} // Thêm lề phải trực tiếp ở đây
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                      </span>
                    </div>
                    <ErrorMessage name='enterPassword' component='div' className='form-message text-danger' />
                  </div>
                  <MDBCheckbox
                    name='flexCheck'
                    id='flexCheckDefault'
                    className='mb-4'
                    label='Remember password'
                  />
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-lg gradient-custom-4 w-100 text-white"
                      style={customStyle.button}
                      disabled={!isValid}  // Disable the button when the form is not valid
                    >
                      Login
                    </button>
                  </div>

                  <hr className="my-4" />

                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-danger btn-block btn-lg gradient-custom-4 w-100 text-white"
                      style={{ ...customStyle.button, ...customStyle.socialButton }}
                    >
                      <FontAwesomeIcon icon={faGoogle} className="me-2" /> Sign in with Google
                    </button>
                  </div>

                  <div className="d-flex justify-content-center" style={{ marginTop: '10px' }}>
                    <button
                      type="button"
                      className="btn btn-primary btn-block btn-lg gradient-custom-4 w-100 text-white"
                      style={{ ...customStyle.button, ...customStyle.socialButton }}
                    >
                      <FontAwesomeIcon icon={faFacebook} className="me-2" /> Sign in with Facebook
                    </button>
                  </div>
                  <p className="text-center text-muted mt-5 mb-0">
                    Don't have an account?{' '}
                    <a href="./Signup" className="fw-bold text-body">
                      <u>Register here</u>
                    </a>
                  </p>

                </MDBCardBody>
              </MDBCard>

            </MDBCol>
          </MDBRow>

        </MDBContainer>
      </ Form>)}
    </ Formik>
   </div>
  );
}
export default Login;



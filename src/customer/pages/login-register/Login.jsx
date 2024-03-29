import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../context/AuthContext';
import LoadingSpinner from '../../../components/loading-spinner/LoadingSpinner';
import Navbar from '../../navbar/Navbar';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../../../api/UrlConstant';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
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

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const authContext = useAuth();
  const location = useLocation();

  const navigate = useNavigate();
  let redirectUrl = location.state?.path || "/";

  const handleSubmit = async (values) => {
    setLoading(true);
    if (await authContext.handleLogin(values)) {
      setErrorMessage("");
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.userRole.name === "HOTEL") redirectUrl = "/business/hotels";
      navigate(redirectUrl, { replace: true })
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div>
      {loading && <LoadingSpinner />}
      <div className='fixed-navbar'><Navbar /></div>
      <div className="bg-white " style={{ height: '50px' }}></div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
              <MDBCol col='12'>
                <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                  <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                    <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                    <div className='mb-3'>
                      <label className="mb-1" htmlFor="email">
                        Email address <span className="required text-danger">*</span>{' '}
                      </label>
                      <Field
                        id='email'
                        type='email'
                        name='email'
                        size="lg"
                        className='form-control rounded border-1'
                        style={customInputStyle}
                      />
                      <ErrorMessage name='email' component='div' className='form-message text-danger' />
                    </div>
                    <div className='mb-2'>
                      <label className="mb-1" htmlFor='password'>
                        Password <span className="required text-danger">*</span>{' '}
                      </label>
                      <Field
                        id='password'
                        type='password'
                        name='password'
                        size="lg"
                        className='form-control rounded border-1'
                        style={customInputStyle}
                      />
                      <ErrorMessage name='password' component='div' className='form-message text-danger' />
                    </div>
                    {errorMessage && <div component='div' className='form-message text-danger mb-2' >{errorMessage}</div>}
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
                      >
                        Login
                      </button>
                    </div>

                    <hr className="my-4" />

                    <div className="d-flex justify-content-center">
                      <a
                        type="button"
                        className="btn btn-danger btn-block btn-lg gradient-custom-4 w-100 text-white"
                        style={{ ...customStyle.button, ...customStyle.socialButton }}
                        alt='Google'
                        href={GOOGLE_AUTH_URL}
                      >
                        <FontAwesomeIcon icon={faGoogle} className="me-2" /> Sign in with Google
                      </a>
                    </div>

                    <div className="d-flex justify-content-center" style={{ marginTop: '10px' }}>
                      <a
                        type="button"
                        className="btn btn-primary btn-block btn-lg gradient-custom-4 w-100 text-white"
                        style={{ ...customStyle.button, ...customStyle.socialButton }}
                        alt='Facebook'
                        href={FACEBOOK_AUTH_URL}
                      >
                        <FontAwesomeIcon icon={faFacebook} className="me-2" /> Sign in with Facebook
                      </a>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">
                      Don't have an account?{' '}
                      <Link to="/signup" className="fw-bold text-body">
                        <u>Register here</u>
                      </Link>
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </ Form>
      </ Formik>
    </div>
  );
}
export default Login;


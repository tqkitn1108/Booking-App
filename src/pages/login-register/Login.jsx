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

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign in</h2>

              {/*  <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg"/> */}
              <label className="mb-1" htmlFor="enterEmail">Email address  <span className="required text-danger">*</span> </label>
              <MDBInput
                wrapperClass='mb-4 w-100'
                id='enterEmail'
                type='email'
                size="lg"
              />

              <label className="mb-1" htmlFor='enterPassword'>Password  <span className="required text-danger">*</span> </label>
              <MDBInput
                wrapperClass='mb-4 w-100'
                id='enterPassword'
                type='password'
                size="lg"
              />
              <MDBCheckbox
                name='flexCheck'
                id='flexCheckDefault'
                className='mb-4'
                label='Remember password'
              />

              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary btn-block btn-lg gradient-custom-4 w-100 text-white"
                  style={customStyle.button}
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


            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}
export default Login;



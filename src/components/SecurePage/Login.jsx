import React from "react";
import { Link } from 'react-router-dom'
import './Login.css'
import Check1 from "./navbar";

function Login() {
  return (
    <div className="div">
      <Check1/>
    <div className='Login template d-flex flex-column align-items-center vh-100 bg-white mt'>
      
      <div className='form_container p-5 rounded bg-white'>
        <form>
          <h3 className='text-center'> Sign In </h3>
          <div className='mb-2'>
            <label htmlFor='Email'> Email </label>
            <input type="email" placeholder='Enter Email' className='form-control' />
          </div>
          <div className='mb-2'>
            <label htmlFor='password'> Password </label>
            <input type="password" placeholder='Enter Password' className='form-control' />
          </div>
          <div className='mb-2'>
            <input type="checkbox" className='custom-control custom-checkbox' id="check" />
            <label htmlFor='check' className='custom-input-label ms-2'>
              Remember me
            </label>
          </div>
          <div className='d-grid'>
            <button className='btn btn-primary'> Sign In</button>
          </div>
          <p className='text-end mt-2'>
            Forgot <a href=""> Password? </a> <Link to="/Signup" className=""> Sign up</Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login;
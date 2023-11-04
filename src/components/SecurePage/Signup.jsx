import React from "react";
import { Link } from "react-router-dom";

function Signup(){
    return (
        <div className='signup template d-flex justify-content-center align-items-center vh-100 bg-primary'>
        <div className='form_container p-5 rouded bg-white'>
            <form>
                <h3 className='text-center'> Sign Up </h3>
                <div className='mb-2'>
                    <label htmlFor='fname'> Full Name </label>
                    <input type="text" placeholder='Enter Full Name' className='form-control' />
                </div>
               
                <div className='mb-2'>
                    <label htmlFor='Email'> Email </label>
                    <input type="email" placeholder='Enter Email' className='form-control' />
                </div>
                <div className='mb-2'>
                    <label htmlFor='password'> Password </label>
                    <input type="password" placeholder='Enter Password' className='form-control' />
                </div>
                <div className='mb-2'>
                    <label htmlFor='Cpassword'> Confirm Password </label>
                    <input type="text" placeholder='Enter Password' className='form-control' />
                </div>
                

                <div className='d-grid mt-2'>
                    <button className='btn btn-primary'> Sign In</button>
                </div>
                <p className='text-end mt-2 '>
                   Already Register < Link to="/Login" className=" = 'ms-2"> Sign in</Link>
                </p>
            </form>
        </div>
    </div>

    )
}

export default Signup;
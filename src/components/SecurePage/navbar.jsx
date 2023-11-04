import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Check1= () => {
    return (
        <div className="div">
            <nav className="navbar  navbar-dark bg-primary navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand font-weight-bold text-white" href="/">Booking.com</a>
                    <div className="navbar-nav">
                        <Link to="/Signup" className="">
                            <button className="btn btn-light mx-2">Register</button>
                        </Link>
                        <Link to="/Login" className="" >
                            <button className="btn btn-light">Login</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
        );
}

export default Check1;
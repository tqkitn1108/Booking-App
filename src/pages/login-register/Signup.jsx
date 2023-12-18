import React from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { registerUser } from '../../api/ApiAuthService';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .matches(/^[a-zA-Z\sÀ-ỹ]+$/, 'Name must contain only letters and spaces')
        .matches(/^(?!.*\s{2})/, 'Name must not contain consecutive spaces')
        .required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .test('no-full-spaces', 'Password must not contain only spaces', value => value.trim() !== '')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    agreement: Yup.boolean().oneOf([true], 'You must agree to the Terms of Service'),
});
const Signup = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    console.log("haha");
    const customStyle = {
        input: {
            fontSize: '1rem',
            padding: '0.5rem 1rem',
        },
        label: {
            fontSize: '1rem',
        },
        button: {
            fontSize: '1rem',
        },
        formGroup: {
            marginBottom: '1rem',
        },

    };

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        if (formik.isValid) {
            setLoading(true);
            try {
                const response = await registerUser(values);
                setSuccessMessage(response.data);
                setErrorMessage("");
            } catch (error) {
                setSuccessMessage("");
                setErrorMessage(`${error.response.data.detail}`);
            }
            setLoading(false);
        }
    };
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div>
            <div className="bg-light " style={{ height: '30px' }}></div>
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit} // Pass the handleSubmit function directly
            >
                <div>
                    {loading && <LoadingSpinner />}
                    <section className="vh-100 bg-light">
                        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                            <div className="container h-30">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-12 col-md-8 col-lg-6 col-xl-5"> {/* Adjusted column width */}
                                        <div className="card" style={{ borderRadius: '15px' }}>
                                            <div className="card-body p-5">
                                                <h2 className="text-uppercase text-center mb-3">Create an account</h2>
                                                {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                                                {successMessage &&
                                                    <>
                                                        <p className="alert alert-success">{successMessage}</p>
                                                        <div className="d-flex justify-content-center">
                                                            <button
                                                                onClick={() => navigate("/login")}
                                                                className="btn btn-primary btn-block btn-lg gradient-custom-4 w-100 text-white"
                                                                style={customStyle.button}
                                                            >
                                                                Click here to redirect to the login
                                                            </button>
                                                        </div>
                                                    </>}
                                                {!successMessage && <form onSubmit={formik.handleSubmit}>
                                                    <div className="form-outline mb-3" style={{ ...customStyle.label, fontWeight: 'bold' }}>
                                                        <label className="form-label" htmlFor="fullName" style={customStyle.label}>
                                                            Full Name <span className="required text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="fullName"
                                                            name="fullName"
                                                            className={`form-control form-control-lg ${formik.touched.fullName && formik.errors.fullName ? 'is-invalid' : ''}`}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.fullName}
                                                            style={customStyle.input}
                                                        />
                                                        {formik.touched.fullName && formik.errors.fullName && (
                                                            <div className="invalid-feedback">{formik.errors.fullName}</div>
                                                        )}
                                                    </div>

                                                    {/* Your Email Input */}
                                                    <div className="form-outline mb-3" style={{ ...customStyle.label, fontWeight: 'bold' }}>
                                                        <label className="form-label" htmlFor="email" style={customStyle.label}>
                                                            Your Email <span className="required text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            className={`form-control  ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.email}
                                                            style={customStyle.input}
                                                        />
                                                        {formik.touched.email && formik.errors.email && (
                                                            <div className="invalid-feedback">{formik.errors.email}</div>
                                                        )}
                                                    </div>

                                                    {/* Your Password Input */}
                                                    <div className="form-outline mb-4" style={{ ...customStyle.label, fontWeight: 'bold', position: 'relative' }}>
                                                        <label className="form-label" htmlFor="password" style={customStyle.label}>
                                                            Password <span className="required text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}  // Toggle between 'text' and 'password' based on showPassword state
                                                            id="password"
                                                            name="password"
                                                            className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.password}
                                                            style={customStyle.input}
                                                        />
                                                        <div className=''>
                                                            <button
                                                                type="button"
                                                                className="btn btn-light"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                style={{ position: 'absolute', right: '-2px', transform: 'translateY(-110%)', border: 'none', background: 'transparent', }}
                                                            >
                                                                <box className='lmao'> </box>
                                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
                                                                    className='eye ' />
                                                            </button>
                                                        </div>

                                                        {formik.touched.password && formik.errors.password && (
                                                            <div className="invalid-feedback">{formik.errors.password}</div>
                                                        )}
                                                    </div>

                                                    {/* Your Password Input */}
                                                    {/* Repeat Password Input */}
                                                    <div className="form-outline mb-3" style={{ ...customStyle.label, fontWeight: 'bold', position: 'relative' }}>
                                                        <label className="form-label" htmlFor="confirmPassword" style={customStyle.label}>
                                                            Repeat Password <span className="required text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type={showConfirmPassword ? 'text' : 'password'}  // Toggle between 'text' and 'password' based on showConfirmPassword state
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            className={`form-control form-control-lg ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.confirmPassword}
                                                            style={customStyle.input}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-light"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            style={{ position: 'absolute', right: '-2px', transform: 'translateY(-110%)', border: 'none', background: 'transparent' }}
                                                        >
                                                            <box className='lmao'> </box>
                                                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                                        </button>

                                                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                                            <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                                                        )}
                                                    </div>


                                                    <div className="form-check d-flex justify-content-center mb-5">
                                                        <input
                                                            className="form-check-input me-2"
                                                            type="checkbox"
                                                            value=""
                                                            id="form2Example3cg"
                                                        />
                                                        <label className="form-check-label" htmlFor="form2Example3g" style={customStyle.label}>
                                                            I agree all statements in{' '}
                                                            <a href="#!" className="text-body">
                                                                <u>Terms of service</u>
                                                            </a>
                                                        </label>
                                                    </div>

                                                    <div className="d-flex justify-content-center">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary btn-block btn-lg gradient-custom-4 w-100 text-white"
                                                            style={customStyle.button}
                                                            disabled={!formik.isValid} // Disable the button if the form is not valid
                                                        >
                                                            Register
                                                        </button>
                                                    </div>
                                                    <p className="text-center text-muted mt-5 mb-0">
                                                        Have already an account?{' '}
                                                        <Link to="/login" className="fw-bold text-body">
                                                            <u>Login here</u>
                                                        </Link>
                                                    </p>
                                                </form>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                </div >
            </Formik >
        </div>
    );
}

export default Signup;
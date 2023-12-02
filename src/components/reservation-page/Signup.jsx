import React from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, 'Name must contain only letters')
      .required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    agreement: Yup.boolean().oneOf([true], 'You must agree to the Terms of Service'),
  });
const Signup = () => {
    const handleSubmit = (values, { resetForm }) => {
        const formData = {
            Name: values.name,
            Email: values.email,
            Password: values.password
        };
        console.log('Form values:', formData);
       // resetForm();
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

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

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',

            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit} // Pass the handleSubmit function directly
        >
            <div>
                <section className="vh-100 bg-light">
                    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                        <div className="container h-30">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-8 col-lg-6 col-xl-5"> {/* Adjusted column width */}
                                    <div className="card" style={{ borderRadius: '15px' }}>
                                        <div className="card-body p-5">
                                            <h2 className="text-uppercase text-center mb-4">Create an account</h2>
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className="form-outline mb-3" style={customStyle.formGroup}>
                                                    <label className="form-label" htmlFor="name" style={{ ...customStyle.label, fontWeight: 'bold' }}>
                                                        Your Name <span className="required text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className={`form-control form-control-lg ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.name}
                                                        style={customStyle.input}
                                                    />
                                                    {formik.touched.name && formik.errors.name && (
                                                        <div className="invalid-feedback">{formik.errors.name}</div>
                                                    )}
                                                </div>

                                                {/* Your Email Input */}
                                                <div className="form-outline mb-3"style={{ ...customStyle.label, fontWeight: 'bold' }}>
                                                    <label className="form-label" htmlFor="email" style={customStyle.label}>
                                                        Your Email <span className="required text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className={`form-control form-control-lg ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
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
                                                <div className="form-outline mb-3" style={{ ...customStyle.label, fontWeight: 'bold' }}>
                                                    <label className="form-label" htmlFor="password" style={customStyle.label}>
                                                        Password <span className="required text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.password}
                                                        style={customStyle.input}
                                                    />
                                                    {formik.touched.password && formik.errors.password && (
                                                        <div className="invalid-feedback">{formik.errors.password}</div>
                                                    )}
                                                </div>


                                                {/* Your Password Input */}
                                                {/* Repeat Password Input */}
                                                <div className="form-outline mb-3" style={{ ...customStyle.label, fontWeight: 'bold' }}>
                                                    <label className="form-label" htmlFor="confirmPassword" style={customStyle.label}>
                                                        Repeat Password <span className="required text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="password"  // Set the type attribute to "password"
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        className={`form-control form-control-lg ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.confirmPassword}
                                                        style={customStyle.input}
                                                    />
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
                                                    >
                                                        Register
                                                    </button>
                                                </div>
                                                <p className="text-center text-muted mt-5 mb-0">
                                                    Have already an account?{' '}
                                                    <a href="./Login" className="fw-bold text-body">
                                                        <u>Login here</u>
                                                    </a>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div >
        </Formik >
    );
}

export default Signup;

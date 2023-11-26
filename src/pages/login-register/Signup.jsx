import React from 'react';


function Signup() {
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
            marginBottom: '1rem', // Khoảng cách giữa các phần tử gần nhau
        },
    };

    return (
        <div>
            <section className="vh-100 bg-light">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-30">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: '15px' }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-4">Create an account</h2>
                                        <form>
                                            <div className="form-outline" style={customStyle.formGroup}>
                                                <label className="form-label" htmlFor="form3Example1cg" style={customStyle.label}>
                                                    Your Name  <span className="required text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="form3Example1cg"
                                                    style={customStyle.input}
                                                />
                                            </div>

                                            <div className="form-outline" style={customStyle.formGroup}>
                                                <label className="form-label" htmlFor="form3Example3cg" style={customStyle.label}>
                                                    Your Email  <span className="required text-danger">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg"
                                                    id="form3Example3cg"
                                                    style={customStyle.input}
                                                />
                                            </div>

                                            <div className="form-outline" style={customStyle.formGroup}>
                                                <label className="form-label" htmlFor="form3Example4cg" style={customStyle.label}>
                                                    Password  <span className="required text-danger">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    id="form3Example4cg"
                                                    style={customStyle.input}
                                                />
                                            </div>

                                            <div className="form-outline" style={customStyle.formGroup}>
                                                <label className="form-label" htmlFor="form3Example4cdg" style={customStyle.label}>
                                                    Repeat your password  <span className="required text-danger">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    id="form3Example4cdg"
                                                    style={customStyle.input}
                                                />
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
                                                    type="button"
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
            </section>
        </div>
    );
}

export default Signup;

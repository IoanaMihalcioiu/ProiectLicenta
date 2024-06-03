import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignUpValidation';
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);

        if (err.name === "" && err.email === "" && err.password === "") {
            axios.post('http://localhost:8081/autentificare/signup', values)
                .then(res => {
                    navigate('/login');
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <div className="login-container">
                <div className="login-box">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label htmlFor="name"><strong>Name</strong></label>
                            <input
                                type="text"
                                placeholder='Enter Your Name'
                                name='name'
                                onChange={handleInput}
                            />
                            {errors.name && <span className='text-error'>{errors.name}</span>}
                        </div>
                        <div className="form-control">
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input
                                type="email"
                                placeholder='Enter Email'
                                name='email'
                                onChange={handleInput}
                            />
                            {errors.email && <span className='text-error'>{errors.email}</span>}
                        </div>
                        <div className="form-control">
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input
                                type="password"
                                placeholder='Enter password'
                                name='password'
                                onChange={handleInput}
                            />
                            {errors.password && <span className='text-error'>{errors.password}</span>}
                        </div>
                        <button type='submit' className='btn btn-success'>Sign up</button>
                        <p></p>
                        <Link to="/login" className='btn btn-default border'>Login</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;

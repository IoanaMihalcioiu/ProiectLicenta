import React, { useState, useEffect} from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [backendError, setBackendError] = useState([]);
    const [errors, setErrors] = useState({});

    axios.defaults.withCredentials = true;

    const handleInput = (event) => {
        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    useEffect(()=> {
        axios.get('http://localhost:8081/autentificare/home')
        .then(res => {
          if (res.data.valid){
            navigate ('/home')
          } else {
            navigate ('/login')
          }
          console.log(res)
        })
        .catch( err => console.log(err))
      }, [navigate])

    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);

        if (err.email === "" && err.password === "") {
            axios.post('http://localhost:8081/autentificare/login', values)
                .then(res => {
                    console.log('Login response:', res.data);

                    if (res.data.message === "Success") {
                        console.log('Login successful, navigating to home.');
                        navigate('/home');
                    } else {
                        console.log('Login failed:', res.data.message);
                        setBackendError([{ msg: res.data.message }]);
                        alert("Try again");
                    }
                })
                .catch(err => {
                    console.error('Error logging in:', err);
                    setBackendError([{ msg: 'An error occurred while logging in. Please try again later.' }]);
                });
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                {backendError.length > 0 && backendError.map((e, index) => (
                    <p key={index} className='text-danger'>{e.msg}</p>
                ))}
                <form onSubmit={handleSubmit}>
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
                    <button type='submit' className='btn btn-success'>Log in</button>
                    <p></p>
                    <Link to="/signup" className='btn btn-default border'>Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;

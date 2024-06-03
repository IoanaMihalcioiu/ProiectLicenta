import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Admin from './admin/admin';
import Student from './student';

function Home() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8081/autentificare/home')
      .then(res => {
        if (res.data.valid) {
          setRole(res.data.role);
          if (res.data.role === 'admin') {
            navigate('/admin');
          } else if (res.data.role === 'student' || res.data.role === null) {
            navigate('/student');
          }
        } else {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  return (
    <div>
      {role === "admin" && <Admin />}
      {role === "student" && <Student />}
      {role === null && <Student />}
    </div>
  );
}

export default Home;

import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Student() {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        if (res.data.message === "Success") {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <div>
      <h2>Student</h2>
      <ul className="nav justify-content-center">
        <li className='nav-item'>
          <button onClick={handleLogout}
          href="#">LogOut</button>
        </li>
      </ul>
    </div>
  )
}

export default Student

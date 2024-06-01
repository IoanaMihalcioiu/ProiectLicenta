import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Admin from './admin';
import Student from './student';

function Home() {
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  useEffect(()=> {
    axios.get('http://localhost:8081/home')
    .then(res => {
      if (res.data.valid){
        setRole(res.data.role);
      } else {
        navigate ('/login')
      }
      console.log(res)
    })
    .catch( err => console.log(err))
  }, [navigate])

 

  return (
    <div>
      {role === "admin" && <Admin /> }
      {role === "student"&&  <Student /> }
    </div>
  )
}

export default Home

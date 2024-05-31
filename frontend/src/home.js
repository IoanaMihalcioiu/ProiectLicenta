import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Home() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  useEffect(()=> {
    axios.get('http://localhost:8081/home')
    .then(res => {
      if (res.data.valid){
        setName(res.data.name);
      } else {
        navigate ('/login')
      }
      console.log(res)
    })
    .catch( err => console.log(err))
  }, [])

  return (
    <div>
      Home {name}
    </div>
  )
}

export default Home

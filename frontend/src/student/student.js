import React from 'react'
import axios from 'axios';
import { useNavigate, Link, Outlet} from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../admin/admin.css';


function Student() {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('http://localhost:8081/autentificare/logout')
      .then(res => {
        if (res.data.message === "Success") {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }
  return (
    
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/student"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                STUDENT
              </span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start " id="menu">
              <li className="w-100">
                <Link to="cursuri" className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-people-fill"></i>
                  <span className="ms-2 d-none d-sm-inline">Cursuri</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="search" className="nav-link px-0 align-middle text-white">
                <i class="bi bi-search"></i>
                  <span className="ms-2 d-none d-sm-inline">Cautare Cursuri</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="calendar" className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-book"></i>
                  <span className="ms-2 d-none d-sm-inline">Calendar</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="chat" className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-chat-left-dots-fill"></i>
                  <span className="ms-2 d-none d-sm-inline">Chat</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-box-arrow-right"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="aaa">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Student

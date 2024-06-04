import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./login";
import Signup from "./signup";
import Home from './home'
import Intro from "./intro";
import Student from "./student/student";
import Admin from "./admin/admin";
import CourseManagement from "./admin/CourseManagement";
import StudentManagement from "./admin/StudentManagement";
import Chat from "./admin/Chat";
import ChatStudenti from "./student/ChatStudenti";
import Calendar from "./student/Calendar";
import CursuriStudenti from "./student/CursuriStudenti";
import Search from "./student/Search";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/student' element={<Student />} >
           <Route path='/student/cursuri' element={<CursuriStudenti />}> </Route>
           <Route path='/student/search' element={<Search />}> </Route>
           <Route path='/student/calendar' element={<Calendar />}> </Route>
            <Route path='/student/chat' element={<ChatStudenti />}> </Route>
        </Route>
        <Route path='/admin' element={<Admin />}>
          <Route path='/admin/studenti' element={<StudentManagement />}> </Route>
          <Route path='/admin/cursuri' element={<CourseManagement />}> </Route>
          <Route path='/admin/chat' element={<Chat />}> </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

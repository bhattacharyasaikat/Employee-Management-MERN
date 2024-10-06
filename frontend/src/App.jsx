import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './pages/Login'
import {useNavigate } from "react-router-dom"
import Dashboard from './pages/dashboard'
import EmployeeListPage from './pages/EmployeeListPage'
import EditEmployee from './pages/EditEmployee'
import CreateEmployee from './pages/CreateEmployee'
const App = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path = "/dashboard" element={<Dashboard/>} />
      <Route path="/employees" element={<EmployeeListPage />} />
      <Route path = "/editEmployee/:id" element = {<EditEmployee/>}/>
      <Route path = "/createEmployee" element = {<CreateEmployee/>}/>

    </Routes>
  )
}

export default App

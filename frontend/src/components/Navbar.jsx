import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [employees, setEmployees] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/getEmployees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    fetchEmployees();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <ul className="flex space-x-6 text-white">
          <li>
            <Link to="/dashboard" className="hover:text-gray-400 transition duration-200">Home</Link>
          </li>
          <li>
            <Link to="/employees" className="hover:text-gray-400 transition duration-200">Employee List</Link>
          </li>
          <li>
            <span className="text-gray-300">{username}</span>
          </li>
        </ul>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

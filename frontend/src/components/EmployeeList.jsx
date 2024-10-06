

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchParams, setSearchParams] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_gender: '',
    f_Designation: '',
    f_Course: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(4);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSortOrder = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const fetchEmployees = async () => {
    try {
      const queryString = new URLSearchParams({
        ...searchParams,
        page: currentPage,
        limit,
        sort: sortField,
        order: sortOrder,
      }).toString();

      const response = await fetch(`http://localhost:3000/api/v1/getEmployees?${queryString}`);
      const data = await response.json();

      if (data.status) {
        setEmployees(data.employees);
        setTotalPages(data.totalPages);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/deleteEmployee/${employeeId}`, {
          method: 'DELETE',
        });
        const data = await response.json();

        if (data.success) {
          fetchEmployees();
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [searchParams, currentPage, sortField, sortOrder]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Employee List</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          name="f_Name"
          placeholder="Search by Name"
          value={searchParams.f_Name}
          onChange={(e) => setSearchParams({ ...searchParams, f_Name: e.target.value })}
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="f_Email"
          placeholder="Search by Email"
          value={searchParams.f_Email}
          onChange={(e) => setSearchParams({ ...searchParams, f_Email: e.target.value })}
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={() => setCurrentPage(1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th
              onClick={() => toggleSortOrder('f_Id')}
              className="py-2 px-4 cursor-pointer hover:bg-gray-300"
            >
              Unique Id
            </th>
            <th
              onClick={() => toggleSortOrder('f_Name')}
              className="py-2 px-4 cursor-pointer hover:bg-gray-300"
            >
              Name
            </th>
            <th
              onClick={() => toggleSortOrder('f_Email')}
              className="py-2 px-4 cursor-pointer hover:bg-gray-300"
            >
              Email
            </th>
            <th
              onClick={() => toggleSortOrder('f_Mobile')}
              className="py-2 px-4 cursor-pointer hover:bg-gray-300"
            >
              Mobile No
            </th>
            <th
              onClick={() => toggleSortOrder('f_Designation')}
              className="py-2 px-4 cursor-pointer hover:bg-gray-300"
            >
              Designation
            </th>
            <th
              onClick={() => toggleSortOrder('f_gender')}
              className="py-2 px-4 cursor-pointer hover:bg-gray-300"
            >
              Gender
            </th>
            <th
              onClick={() => toggleSortOrder('f_Course')}
              className="py-2 px-4 cursor-pointer hover:bg-gray-300"
            >
              Course
            </th>
            <th
              onClick={() => toggleSortOrder('f_Createdate')}
              className="py-2 px-4 cursor-pointer hover:bg-gray-300"
            >
              Create Date
            </th>
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="text-center border-b">
              <td className="py-2 px-4">{employee.f_Id}</td>
              <td className="py-2 px-4">{employee.f_Name}</td>
              <td className="py-2 px-4">{employee.f_Email}</td>
              <td className="py-2 px-4">{employee.f_Mobile}</td>
              <td className="py-2 px-4">{employee.f_Designation}</td>
              <td className="py-2 px-4">{employee.f_gender}</td>
              <td className="py-2 px-4">{employee.f_Course}</td>
              <td className="py-2 px-4">
                {new Date(employee.f_Createdate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4">
                {employee.f_Image ? (
                  <img
                    src={`http://localhost:3000/uploads/${employee.f_Image}`}
                    alt={employee.f_Name}
                    className="w-16 h-16 object-cover rounded-full mx-auto"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => navigate(`/editEmployee/${employee._id}`)}
                  className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 mr-2 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEmployee(employee._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 flex justify-between items-center">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(prev => prev - 1)}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'} transition duration-200`}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(prev => prev + 1)}
          className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'} transition duration-200`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;

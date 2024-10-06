import React, { useState } from 'react';

const CreateEmp = () => {
    const [employee, setEmployee] = useState({
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_gender: 'M', // default gender
        f_Course: '', // for checkbox
        f_Image: null, // for file upload
      });
    
      const [errorMessages, setErrorMessages] = useState({});
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
          ...prevEmployee,
          [name]: value,
        }));
      };
    
      const handleFileChange = (e) => {
        setEmployee((prevEmployee) => ({
          ...prevEmployee,
          f_Image: e.target.files[0],
        }));
      };
    
      const validateForm = () => {
        const errors = {};
        const { f_Name, f_Email, f_Mobile } = employee;
    
        if (!f_Name) errors.f_Name = 'Name is required.';
        if (!f_Email) errors.f_Email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(f_Email)) errors.f_Email = 'Email is invalid.';
    
        if (!f_Mobile) errors.f_Mobile = 'Mobile number is required.';
        else if (!/^\d+$/.test(f_Mobile)) errors.f_Mobile = 'Mobile number must be numeric.';
    
        setErrorMessages(errors);
        return Object.keys(errors).length === 0;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return; // Validate the form
    
        // Create a FormData object to handle text fields and file uploads
        const formData = new FormData();
        formData.append("f_Name", employee.f_Name);
        formData.append("f_Email", employee.f_Email);
        formData.append("f_Mobile", employee.f_Mobile);
        formData.append("f_Designation", employee.f_Designation);
        formData.append("f_gender", employee.f_gender);
        formData.append("f_Course", employee.f_Course);
    
        // Only append the file if a new one was uploaded
        if (employee.f_Image) {
          formData.append("f_Image", employee.f_Image);
        }
    
        try {
          const response = await fetch(
            `http://localhost:3000/api/v1//createEmployee`,
            {
              method: "POST",
              body: formData,
            }
          );
    
          const data = await response.json();
    
          if (data.success) {
            alert(data.message); // Success message
            navigate("/employees"); // Redirect to employee list
          } else {
            alert(data.message); // Error message
          }
        } catch (error) {
          console.error("Error updating employee:", error);
        }
      };
    
      return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Create Employee</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="f_Name"
                value={employee.f_Name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errorMessages.f_Name && <span className="text-red-500 text-sm">{errorMessages.f_Name}</span>}
            </div>
    
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="f_Email"
                value={employee.f_Email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errorMessages.f_Email && <span className="text-red-500 text-sm">{errorMessages.f_Email}</span>}
            </div>
    
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Mobile No</label>
              <input
                type="text"
                name="f_Mobile"
                value={employee.f_Mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errorMessages.f_Mobile && <span className="text-red-500 text-sm">{errorMessages.f_Mobile}</span>}
            </div>
    
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Designation</label>
              <select
                name="f_Designation"
                value={employee.f_Designation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
    
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Gender</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="f_gender"
                    value="M"
                    checked={employee.f_gender === 'M'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="f_gender"
                    value="F"
                    checked={employee.f_gender === 'F'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
            </div>
    
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Course</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="f_Course"
                    value="MCA"
                    checked={employee.f_Course === 'MCA'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  MCA
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="f_Course"
                    value="BCA"
                    checked={employee.f_Course === 'BCA'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  BCA
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="f_Course"
                    value="BSC"
                    checked={employee.f_Course === 'BSC'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  BSC
                </label>
              </div>
            </div>
    
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Image Upload</label>
              <input
                type="file"
                accept=".jpg,.png"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
              Create
            </button>
          </form>
        </div>
      );
    };
    

export default CreateEmp
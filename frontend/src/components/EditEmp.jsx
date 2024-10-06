import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const EditEmp = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [employee, setEmployee] = useState({
      f_Name: "",
      f_Email: "",
      f_Mobile: "",
      f_Designation: "",
      f_gender: "M",
      f_Course: "",
      f_Image: null,
    });
  
    const [errorMessages, setErrorMessages] = useState({});
  
    useEffect(() => {
      const fetchEmployee = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/employee/${id}`);
          const data = await response.json();
  
          if (data.success) {
            setEmployee({
              f_Name: data.employee.f_Name || "",
              f_Email: data.employee.f_Email || "",
              f_Mobile: data.employee.f_Mobile || "",
              f_Designation: data.employee.f_Designation || "",
              f_gender: data.employee.f_gender || "M",
              f_Course: data.employee.f_Course || "",
              f_Image: data.employee.f_Image,
            });
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      };
  
      fetchEmployee();
    }, [id]);
  
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
  
      if (!f_Name) errors.f_Name = "Name is required.";
      if (!f_Email) errors.f_Email = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(f_Email))
        errors.f_Email = "Email is invalid.";
  
      if (!f_Mobile) errors.f_Mobile = "Mobile number is required.";
      else if (!/^\d+$/.test(f_Mobile))
        errors.f_Mobile = "Mobile number must be numeric.";
  
      setErrorMessages(errors);
      return Object.keys(errors).length === 0;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!validateForm()) return;
  
      const formData = new FormData();
      formData.append("f_Name", employee.f_Name);
      formData.append("f_Email", employee.f_Email);
      formData.append("f_Mobile", employee.f_Mobile);
      formData.append("f_Designation", employee.f_Designation);
      formData.append("f_gender", employee.f_gender);
      formData.append("f_Course", employee.f_Course);
  
      if (employee.f_Image) {
        formData.append("f_Image", employee.f_Image);
      }
  
      try {
        const response = await fetch(`http://localhost:3000/api/v1/employees/${id}`, {
          method: "PUT",
          body: formData,
        });
  
        const data = await response.json();
  
        if (data.success) {
          alert(data.message);
          navigate("/employees"); // Redirect to employee list
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    };
  
    return (
      <div className="p-8 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Employee</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">
              Name:
              <input
                type="text"
                name="f_Name"
                value={employee.f_Name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errorMessages.f_Name && (
                <span className="text-red-500">{errorMessages.f_Name}</span>
              )}
            </label>
          </div>
  
          <div>
            <label className="block mb-1">
              Email:
              <input
                type="email"
                name="f_Email"
                value={employee.f_Email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errorMessages.f_Email && (
                <span className="text-red-500">{errorMessages.f_Email}</span>
              )}
            </label>
          </div>
  
          <div>
            <label className="block mb-1">
              Mobile No:
              <input
                type="text"
                name="f_Mobile"
                value={employee.f_Mobile}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errorMessages.f_Mobile && (
                <span className="text-red-500">{errorMessages.f_Mobile}</span>
              )}
            </label>
          </div>
  
          <div>
            <label className="block mb-1">
              Designation:
              <select
                name="f_Designation"
                value={employee.f_Designation}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </label>
          </div>
  
          <div>
            <label className="block mb-1">
              Gender:
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="f_gender"
                    value="M"
                    checked={employee.f_gender === "M"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="f_gender"
                    value="F"
                    checked={employee.f_gender === "F"}
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
            </label>
          </div>
  
          <div>
            <label className="block mb-1">
              Course:
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="f_Course"
                    value="MCA"
                    checked={employee.f_Course === "MCA"}
                    onChange={handleChange}
                  />
                  MCA
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="f_Course"
                    value="BCA"
                    checked={employee.f_Course === "BCA"}
                    onChange={handleChange}
                  />
                  BCA
                </label>
                <label>
                  <input
                    type="radio"
                    name="f_Course"
                    value="BSC"
                    checked={employee.f_Course === "BSC"}
                    onChange={handleChange}
                  />
                  BSC
                </label>
              </div>
            </label>
          </div>
  
          <div>
            <label className="block mb-1">
              Img Upload:
              <input
                type="file"
                accept=".jpg,.png"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
  
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
            Update
          </button>
        </form>
      </div>
    );
  };
  
export default EditEmp
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "M", // default gender
    f_Course: "", // change to string for radio button
    f_Image: null, // for file upload
  });

  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/employee/${id}`
        );
        const data = await response.json();

        if (data.success) {
          // Set the employee state with fetched data
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      f_Image: e.target.files[0],
    }));
  };

  // Validate form inputs
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
        `http://localhost:3000/api/v1/employees/${id}`,
        {
          method: "PUT",
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
    <div>
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="f_Name"
              value={employee.f_Name}
              onChange={handleChange}
              required
            />
            {errorMessages.f_Name && (
              <span style={{ color: "red" }}>{errorMessages.f_Name}</span>
            )}
          </label>
        </div>

        <div>
          <label>
            Email:
            <input
              type="email"
              name="f_Email"
              value={employee.f_Email}
              onChange={handleChange}
              required
            />
            {errorMessages.f_Email && (
              <span style={{ color: "red" }}>{errorMessages.f_Email}</span>
            )}
          </label>
        </div>

        <div>
          <label>
            Mobile No:
            <input
              type="text"
              name="f_Mobile"
              value={employee.f_Mobile}
              onChange={handleChange}
              required
            />
            {errorMessages.f_Mobile && (
              <span style={{ color: "red" }}>{errorMessages.f_Mobile}</span>
            )}
          </label>
        </div>

        <div>
          <label>
            Designation:
            <select
              name="f_Designation"
              value={employee.f_Designation}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Gender:
            <label>
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
          </label>
        </div>

        <div>
          <label>
            Course:
            <label>
              <input
                type="radio"
                name="f_Course"
                value="MCA"
                checked={employee.f_Course === "MCA"}
                onChange={handleChange}
              />
              MCA
            </label>
            <label>
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
          </label>
        </div>

        <div>
          <label>
            Img Upload:
            <input type="file" accept=".jpg,.png" onChange={handleFileChange} />
          </label>
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditEmployee;

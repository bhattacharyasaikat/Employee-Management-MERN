const Employee = require("../models/Employee");
const multer = require("multer");
const express = require('express');
const app = express() ;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const upload = multer({ storage: storage });

exports.getEmployees = async (req, res) => {
  try {
    const {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Id,
      sort,
      order, // Add order query param to handle asc/desc sorting
    } = req.query;

    const queryObject = {};
    if (f_Name) queryObject.f_Name = { $regex: f_Name, $options: "i" };
    if (f_Email) queryObject.f_Email = { $regex: f_Email, $options: "i" };
    if (f_Mobile) queryObject.f_Mobile = { $regex: f_Mobile, $options: "i" };
    if (f_Designation)
      queryObject.f_Designation = { $regex: f_Designation, $options: "i" };
    if (f_gender) queryObject.f_gender = { $regex: f_gender, $options: "i" };
    if (f_Course) queryObject.f_Course = { $regex: f_Course, $options: "i" };
    if (f_Id) queryObject.f_Id = { $regex: f_Id, $options: "i" };

    let sortObject = {};
    if (sort) {
      sortObject[sort] = order === 'desc' ? -1 : 1; // Set sorting order based on 'order' parameter
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 4;
    let skip = (page - 1) * limit;

    const employees = await Employee.find(queryObject)
      .sort(sortObject)
      .skip(skip)
      .limit(limit);

    const totalEmployees = await Employee.countDocuments(queryObject);

    res.status(200).json({
      status: true,
      employees,
      total: totalEmployees,
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / limit),
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

  exports.employeeById = async (req, res) => {
    try {
      const { id } = req.params; 
  
      const employee = await Employee.findById(id);
  
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        employee,
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Server error: ${error.message}`,
      });
    }
  };
exports.editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    // Combine form data and file
    const employeeData = { ...req.body };
    console.log(employeeData) ;
    if (req.file) {
      employeeData.f_Image = req.file.path; // Store the file path in employee data
    }
    console.log(req.body) ;
    // Update employee in database
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employeeData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
  
};

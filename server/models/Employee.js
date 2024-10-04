const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  f_Id: {
    type: Number,
   required: true,
    unique: true
  },
  f_Image: {
    type: String,  // You can store the image URL or use GridFS for image files
    required: false
  },
  f_Name: {
    type: String,
    // required: true
  },
  f_Email: {
    type: String,
    required: true,
    unique: true
  },
  f_Mobile: {
    type: String,
    required: true,
    unique: true
  },
  f_Designation: {
    type: String,
    required: true
  },
  f_gender: {
    type: String,
    required: true
  },
  f_Course: {
    type: String,
    required: false
  },
  f_Createdate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;

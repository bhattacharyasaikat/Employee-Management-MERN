const Employee = require('../models/Employee'); 
const { z } = require('zod');
const employeeSchema = z.object({
    f_Name: z.string().min(1, "Name is required"),
    f_Email: z.string().email("Invalid email format"),
    f_Mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
    f_Designation: z.enum(["HR","Manager","sales"],{errorMap: () => ({ message: "Designation must be HR/Manager/sales" }) }),
    f_gender: z.enum(["M", "F",], { errorMap: () => ({ message: "Gender must be Male, Female, or Other" }) }),
    f_Course: z.enum(["MCA", "BCA","BSC"], { errorMap: () => ({ message: "Course  must be MCA/BCA/BSC" }) }),
  });
exports.createEmployee = async (req, res) => {
  try {
    // console.log("Request body:", req.body);
    // console.log("Uploaded file:", req.file);
    const parsedData = employeeSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: parsedData.error.errors,
        });
      }
    // Generate new ID based on existing records
    const existingId = await Employee.findOne().sort({ f_Id: -1 });
    const newId = existingId ? existingId.f_Id + 1 : 1;

    // const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = parsedData.data;
    
    const f_Image = req.file ? `/uploads/${req.file.filename}` : null; // Store the image file path relative to public

    // Validate required fields
    if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check for duplicate email in the database
    const existingEmployee = await Employee.findOne({ f_Email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }
    const newEmployee = new Employee({
      f_Id: newId,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Image, 
    });

    await newEmployee.save();

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

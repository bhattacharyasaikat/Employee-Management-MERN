const express = require("express");
const router = express.Router();

const { createEmployee } = require("../controllers/createEmployee");
const {getEmployees, editEmployee,employeeById} = require("../controllers/getEmployees") ;
const {toggleEmployeeStatus} = require("../controllers/toggleEmployeeStatus") ;
const upload = require("../middlewires/upload");
const { deleteEmployee } = require("../controllers/deleteEmployee");

// Test route
router.get("/createEmployeeTest", async (req, res) => {
    return res.json({
        success: true,
        message: "Hello from employee test",
    });
});

// Create employee route with file upload
router.post("/createEmployee", upload.single('f_Image'), async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded. Please upload an image.",
            });
        }
        
        // Call the createEmployee controller
       // await console.log("file uploaded")
        await createEmployee(req, res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the employee.",
        });
    }
});

router.get("/getEmployees",getEmployees) ;
router.get("/employee/:id",employeeById) ;
router.put("/employees/:id",upload.single('f_Image'),editEmployee) ;
router.put("/toggleStatus/:id",toggleEmployeeStatus)
router.delete("/deleteEmployee/:id",deleteEmployee) ;
module.exports = router;

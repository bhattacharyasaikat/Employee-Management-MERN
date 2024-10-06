const Employee = require("../models/Employee" ) ;

exports.toggleEmployeeStatus = async(req,res) =>{
    try {
        const { id } = req.params;
        console.log("toggle hit");
        const employee = await Employee.findById(id);
        if (!employee) {
          return res.status(404).json({ success: false, message: 'Employee not found' });
        }
    
        employee.isActive = !employee.isActive; // Toggle active status
        await employee.save();
    
        return res.status(200).json({
          success: true,
          message: `Employee is now ${employee.isActive ? 'active' : 'deactivated'}`,
          employee,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Server error: ${error.message}`,
        });
      }
}
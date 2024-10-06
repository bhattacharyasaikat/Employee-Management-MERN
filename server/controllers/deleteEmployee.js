const Employee = require('../models/Employee'); 

exports.deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id; 
   console.log("hit") ;
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

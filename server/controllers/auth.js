const User = require("../models/Login");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.login = async (req, res) => {
  try {
    
    const { username, password } = req.body;
   
    if (!username || !password) {
      return res.status(400).json({
        succeess: false,
        message: "All fields are required",
      });
    }
    f_userName = username ;
    f_Pwd = password ;
    const user = await User.findOne({ f_userName });

    // checking user exist or not
    if (!user) {
      return res.status(400).json({
        succeess: false,
        message: "User does not exit.",
      });
    }

    // check passsword
    // if correct pass
    if (f_Pwd == user.f_Pwd) {
      const token = jwt.sign(
        { f_userName: user.f_f_userName, id: user._id },
        process.env.JWT_SECRET
      );
      user.token = token;
      user.f_Pwd = undefined;

      const tokenOptions = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        httpOnly: true,
      };

      res.cookie("token", token, tokenOptions);

      res.cookie("f_userName", f_userName, {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        }) ;

    //   localStorage.setItem("f_userName", f_userName);
      //   console.log(`token: ${token}`) ;

      return res.status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(400).json({
        succeess: false,
        message: "Incorrect f_Pwd.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

const express = require("express") ;
const router = express.Router() ;

const {login} = require("../controllers/auth") ;
router.get("/loginTest",async (req,res)=>{
    return res.json({
		success: true,
		message: "Login get is working",
	});
})
router.post("/login",login) ;
module.exports = router
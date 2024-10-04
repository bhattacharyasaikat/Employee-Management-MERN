const express = require("express") ;
const app = express() ;
const database = require("./config/db");
const path = require('path');

const PORT = 3000 ;
const dotenv = require("dotenv");
app.use(express.json());
app.use('../uploads', express.static(path.join(__dirname, 'uploads')));
dotenv.config();
database.connect() ;
const userRoutes = require("./routes/User");
const employeeRoutes = require("./routes/Employee") ;
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});


app.use("/api/v1",userRoutes) ;
app.use("/api/v1",employeeRoutes) ;

app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});
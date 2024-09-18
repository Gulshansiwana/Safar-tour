const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { exec } = require('child_process');
const path = require('path');


dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));



//import routes
const verificationOtp = require('./api/otpvalidation/otp-route');
const user = require('./api/userProfile/auth-routes');


app.use('/api/', verificationOtp);
app.use('/api/', user);









app.get('/', (req, res) => {
  res.send(' testing.........');
});



// Run the cleanup script
exec('node ./cleanupIndexes.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing cleanup script: ${error}`);
    return;
  }
  console.log(`Cleanup script output: ${stdout}`);
  if (stderr) {
    console.error(`Cleanup script stderr: ${stderr}`);
  }
});


sequelize.sync({ alter: true })
//  local server start code
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

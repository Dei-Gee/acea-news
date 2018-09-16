var nodemailer = require('nodemailer');
const creds = require('./emailkey');

var transport = {
  host: 'smtp.gmail.com',
  port: 587, 
  secure: false, 
  auth: {
    user: creds.USER, 
    pass: creds.PASS
  }, 
  tls: {
    rejectUnauthorized: false
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

module.exports = transporter;

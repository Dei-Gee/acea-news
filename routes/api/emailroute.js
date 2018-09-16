const express = require('express');
const router = express.Router();
const transporter = require('../../config/transporter');


// @route POST to api/emailRoute
// @desc POST an email
// @access private

router.post('/', (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} `
  
    var mail = {
      from: email,
      to: 'deji2109@gmail.com',  //Change to email address that you want to receive messages on
      subject: 'New Message from Contact Form',
      text: `${content}`
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        });
        console.log(err);
      } else {
        res.json({
          msg: 'success'
        });
      }
    })
  })

  module.exports = router;
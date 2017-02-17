import express from 'express';
import usersRegister from '../models/usersRegister';
import nodemailer from 'nodemailer';

let router = express.Router();

let smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bradas.ilija@gmail.com',
        pass: 'uswq3509'
    }
}, {
    // default values for sendMail method
    from: 'sender@address',
    headers: {
        'My-Awesome-Header': '123'
    }
});

router.post('/', function(req, res,next) {
    let rand = Math.floor((Math.random() * 100) + 54);
    let host = req.header('host');
    let link = `http://${host}/verify?id=${rand}`;
    let mailOptions = {
        to: req.body.email,
        subject: 'Please confirm your Email account',
        html: 'Hello,<br> Please Click on the link to verify your email.<br><a href=' + link + '>Click here to verify</a>'
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(err, response) {
      if (err) {
          response = {
              'error': true,
              'message': 'Error sending data'
          };
      }
      else {
          response = {
              'error': false,
              'message': 'Message sent'
          };
      }
      res.json(response);
    });
});

export default router;

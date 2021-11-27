const connection = require("../connection");
const express = require('express');
const router = express.Router();
require('dotenv').config()

module.exports = router;

router.get('/api/email', (req, res, next) => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: process.env.TO_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: 'Email from ' + process.env.ENV_NAME + ' SendGrid',
    text: 'This is the plain text',
    html: 'This is some <strong>HTML</strong> text',
  };
  sgMail.send(msg);
  const result = { 'success': true }
  return res.json(result);
})

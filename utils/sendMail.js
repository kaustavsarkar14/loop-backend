import nodemailer from "nodemailer";
import { CLIENT_BASE_URL, SERVER_BASE_URL } from "./CONSTANTS.js";

export const sendMail = ({email, verifyToken})=>{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verify your email',
      html: `<!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 40px auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
                  text-align: center;
              }
              .header {
                  font-size: 24px;
                  color: #333;
              }
              .message {
                  font-size: 16px;
                  color: #666;
                  margin: 20px 0;
              }
              .verify-button {
                  display: inline-block;
                  padding: 10px 20px;
                  font-size: 18px;
                  color: #fff;
                  background-color: #007bff;
                  border-radius: 4px;
                  text-decoration: none;
                  transition: background-color 0.3s ease;
              }
              .verify-button:hover {
                  background-color: #0056b3;
              }
              .footer {
                  margin-top: 30px;
                  font-size: 14px;
                  color: #999;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">Verify Your Email</div>
              <div class="message">
                  Please click the button below to verify your email address and complete your registration.
              </div>
              <a href="${SERVER_BASE_URL}/auth/verify/${verifyToken}" class="verify-button">Verify Email</a>
              <div class="footer">
                  If you did not request this email, you can safely ignore it.
              </div>
          </div>
      </body>
      </html>`
    };
     
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
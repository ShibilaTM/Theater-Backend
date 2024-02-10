const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ADMIN,
    pass: process.env.APP_PASSWORD,
  },
});

const sendConfirmationEmail = async (userEmail, booking) => {
  const mailOptions = {
    from: {
      name: 'Theater Admin',
      address: process.env.ADMIN,
    },
    to: [userEmail],
    subject: 'Movie Booking Confirmation',
    text: `Dear User,\n\nYour movie ticket booking has been confirmed!\n\nDetails:\nMovie: ${booking.movieTitle}\nShow Date: ${booking.showDate}\nShow Time: ${booking.showTime}\nSeat Number: ${booking.selectedSeats}\n\nThank you for choosing our service!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email has been sent');
    
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendConfirmationEmail,
};

const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async function sendMail(str, data) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "choudharysangam03@gmail.com", // generated ethereal user
      pass: "jaurmfwbpzzjbuti", // generated ethereal password
    },
  });

  var Osubject, Ohtml;
  if (str == "signup") {
    Osubject = `thank you for signing ${data.email}`;
    Ohtml = `<h1>Welcome to ghost foods</h1>
    <h3> name - ${data.name} </h3
    <h3> name - ${data.email} </h3
    `;
  } else {
    Osubject = `Reset password Link`;
    Ohtml = `link - ${data.resetPasswordLink}`;
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '<choudharysangam03@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    html: Ohtml, // html body
  });
};

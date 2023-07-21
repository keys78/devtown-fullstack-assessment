// import nodemailer from 'nodemailer'

// const sendEmail = async (options: any) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         host: 'smtp.gmail.com',
//         secure: false,
//         port: 25,
//         auth: {
//             user: process.env.EMAIL_FORM,
//             pass: process.env.EMAIL_PASS
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//     })

//     const mailOptions = {
//         from: process.env.EMAIL_FORM,
//         to: options.to,
//         subject: options.subject,
//         html: options.text
//     }
//     transporter.sendMail(mailOptions, function (err, info) {
//         if(err) {
//             console.log(err)
//         }else {
//             console.log(info)
//         }
//     });
   
// };

// export default sendEmail;


import nodemailer from 'nodemailer';

const sendEmail = async (options: any) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      port: 25,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email.');
  }
};

export default sendEmail;

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

export const recieveMail = async (user, link) => {
  const { email, surname } = user;
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Verification Email",
    html: `<h1>Hello ${surname}</h1><p>Click the link below to verify your account</p><a href="${link}" target="_blank">Click here</a>`,
  });
};

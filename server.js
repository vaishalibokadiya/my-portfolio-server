const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "vaishalibokadiya596@outlook.com",
    pass: "portfolioContact",
  },
});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.post("/", (req, res) => {
  const { name, email, message } = req.body;

  const options = {
    from: "vaishalibokadiya596@outlook.com",
    to: "vaishalibokadiya596@outlook.com",
    subject: "Contact Form | Message Recieved",
    text: `You recieved a message. Name: ${name}, Email: ${email} and Message: ${message}`,
  };
  transporter.sendMail(options, (err, info) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(201).send(info.response);
    }
  });
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));

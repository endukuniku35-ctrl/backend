require("dotenv").config();

const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const nodemailer = require("nodemailer");

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(bodyParser.json());

/* =========================
   MAIL CONFIGURATION
========================= */

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

/* =========================
   CONTACT API
========================= */

app.post("/send", async (req, res) => {

    try {

        const {

            name,
            email,
            phone,
            message

        } = req.body;

        console.log(req.body);

        /* EMAIL */

        const mailOptions = {

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            subject: "🚀 New Portfolio Contact",

            html: `

                <h2>New Portfolio Contact</h2>

                <p><b>Name:</b> ${name}</p>

                <p><b>Email:</b> ${email}</p>

                <p><b>Phone:</b> ${phone}</p>

                <p><b>Message:</b> ${message}</p>

            `
        };

        await transporter.sendMail(mailOptions);

        console.log("Email Sent");

        res.status(200).json({

            message: "Message Sent Successfully 🚀"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Failed To Send Message"

        });

    }

});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});
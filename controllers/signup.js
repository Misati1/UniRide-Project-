const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require.main.require('./models/db_controller');
const nodemailer = require('nodemailer');
const randomToken = require('random-token');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Render signup form
router.get('/', (req, res) => {
    res.render('signup');
});

// Handle form submission
router.post('/', [
    check('username').notEmpty().withMessage("Username is Required"),
    check('password').notEmpty().withMessage("Password is Required"),
    check('email').notEmpty().withMessage("Email is Required")
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const email_status = "Not Verified";
        const { email, username } = req.body;

        // Perform user signup
        await db.signup(username, email, req.body.password, email_status);

        // Generate verification token
        const token = randomToken(8);

        // Send verification email
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "ephraimloch@gmail.com",
                pass: "88Carterraid&"
            }
        });

        const output = `
            <p>Dear ${username},</p>
            <p>Thank you for signing up. Your user verification ID and Token is given below:</p>
            <ul>
                <li>User ID: ${email}</li>
                <li>Token: ${token}</li>
            </ul>
            <p>Verification Link: <a href="http://localhost:3000/verify">Verify Here</p>
            <p>This is an automatically generated email</p>
        `;

        const mailOptions = {
            from: '8ight@gmail.com',
            to: email,
            subject: 'Email Verification',
            html: output
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending verification email:', err);
                return res.status(500).send('Failed to send verification email');
            }
            console.log('Verification email sent:', info.response);
            res.send("Check your email address for the token to complete your verification");
        });
    } catch (error) {
        console.error('Error processing signup:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;

const emailer = require("nodemailer");
const cors = require("cors");
const express = require("express");
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.static("../"));
app.use(express.static(path.join(__dirname, "../"))); 

app.post('/send-email', async (req, res)=>{
    const data = req.body;
    console.log(data);
    try {
        let pass = await sendEmail(data);
        res.json({ success: true });
    } catch (error) {
        console.log('error:', error);
    }
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function sendEmail(emailData) {
    const transporter = emailer.createTransport({
        service: 'gmail',
        auth: {
            // user: 'donestirio15@gmail.com',
            // pass: 'itjp iwab mpqg yeka'
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    const htmlcontent = `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h4>Hi ${emailData.name}, </h4>
        <p>Here is your Services Details: </p>
        <table style="border-collapse: collapse; width: auto; border: 1px solid #ddd;">
            <tr>
                <th style="padding: 0.5rem; border: 1px solid black;">S.No.</th>
                <th style="padding: 0.5rem; border: 1px solid black;">Services</th>
                <th style="padding: 0.5rem; border: 1px solid black;">Price</th>
            </tr>
            ${
                emailData.list.map((s,i)=>`
                    <tr>
                        <td style="padding: 0.5rem; border: 1px solid black;">${i+1}</td>
                        <td style="padding: 0.5rem; border: 1px solid black;">${s.service}</td>
                        <td style="padding: 0.5rem; border: 1px solid black;">₹${s.rate}</td>
                    </tr>
                `).join('')
            }
            <tr style="font-weight:bold;">
                <td style="padding:8px; border:1px solid black;" colspan="2">Total</td>
                <td style="padding:8px; border:1px solid black;">₹${emailData.total}</td>
            </tr>
        </table>
        <p style="padding-top: 1rem;">Thank you For Booking the Service We will get back to you soon!</p>
        <p style="padding-top: 1rem;">Thanks & Regards,<br/><strong>Laundry Service</strong></p>
    </div>
    `

    const mailbox = {
        from: 'no-reply@example.com' || process.env.SMTP_USER,
        to: emailData.email,
        subject: 'Laundry Service Confirmation Mail.',
        html: htmlcontent
    }
    
    try {
        const info = await transporter.sendMail(mailbox);
        console.log('Email Sent: ', info.response);
        return info.response;
    } catch (error) {
        console.log('Email Error: ', error);
        return info.error;
    }
}
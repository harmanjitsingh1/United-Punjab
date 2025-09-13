import nodemailer from "nodemailer";

// bianka.beier9@ethereal.email
// PbeR6rpwWFDFtzFFhW

const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    service: 'gmail',
    auth: {
        user: 'harmanjitjit3@gmail.com',
        pass: 'rsdlnolvcjatwifl'
    }
    
});

export default transporter;

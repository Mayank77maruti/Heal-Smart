const nodemailer = require('nodemailer')

function transport() {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PW
        },
        host: 'smtp.gmail.com'
    })
}
const transportobj = transport()
const sendwelcomemail = (email, name) => {
    transportobj.sendMail({
        from: `Code-Editor <${process.env.EMAIL}>`,
        to: email,
        subject: 'Thanks for joining!',
        text: `Welcome to our service, ${name}!`,
        html: `<b>Welcome to our service, ${name}!</b>`
    })
}

module.exports = sendwelcomemail;
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env.js');

// send mail from testing account
const signup = async (req, res) => {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "maddison53@ethereal.email",
          pass: "jn7jnAPss4f63QBp6D",
        },
      });
    const message = {
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Succesfully Register with us.", // plain text body
        html: "<b>Succesfully Register with us.</b>", // html body
    }
    transporter.sendMail(message).then((info) => {
        return res.status(201)
            .json({ 
                msg: "you should receive an email",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("Signup Successfully...!");
}

// send mail from real gmail account
const getbill = (req, res) => {

    const { userEmail } = req.body;
 
    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(config);
    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Mailgen",
            link: 'http://mailgen.js/'
        }
    })
    let response = {
        body: {
            name: "Test",
            intro: "Your bill has arrived",
            table: {
                data: [
                    {
                        item: "Nodemailer Stack Book",
                        description: "A Bankend application",
                        price: "$10.99",

                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }
    let mail = MailGenerator.generate(response)
    let message = {
        from: EMAIL,
        to: userEmail,
        subject: "Place Order",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email",
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("Getbill Successfully...!");
}

module.exports = {
    signup,
    getbill
}
import express from 'express';
import MailMessage from '../models/mailMsg.js';

const router = express.Router();

export const createMail=async(req,res)=>{
    const mail=req.body;
    const newMailMsg=new MailMessage({...mail,from:req.user._id,createdAt: new Date().toISOString() }) 

    try{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: `${req.body.user}`,
              pass:`${req.body.pass}`
            }
          });

          cron.schedule(`${req.body.schedule}`, function() {
                var mailOptions = {
                    from: `${req.user.email}`,
                    to: `${req.body.to}`,
                    cc:`${req.body.cc}`,
                    subject: `${req.body.subject}`,
                    text: `${req.body.message}`
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                });
            });

        await newMailMsg.save();

        res.status(201).json(newMailMsg);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMails = async (req, res) => { 
    try {

        const mailMessages = await MailMessage.find({from:req.user._id});
                
        res.status(200).json(mailMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;


import express from 'express';
import mongoose from 'mongoose';

import MailMessage from '../models/mailMsg';

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

          cron.schedule('0 0 * * 3', function() {
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
        const mailMessages = await MailMessage.find();
                
        res.status(200).json(mailMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;


// export const getPost = async (req, res) => { 
//     const { id } = req.params;

//     try {
//         const post = await PostMessage.findById(;
        
//         res.status(200).json(post);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// export const createPost = async (req, res) => {
//     const post = req.body;

//     const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

//     try {
//         await newPostMessage.save();

//         res.status(201).json(newPostMessage );
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

// export const updatePost = async (req, res) => {
//     const { id } = req.params;
//     const { title, message, creator, selectedFile, tags } = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

//     await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//     res.json(updatedPost);
// }

// export const deletePost = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     await PostMessage.findByIdAndRemove(id);

//     res.json({ message: "Post deleted successfully." });
// }

// export const likePost = async (req, res) => {
//     const { id } = req.params;

//     if (!req.userId) {
//         return res.json({ message: "Unauthenticated" });
//       }

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
//     const post = await PostMessage.findById(id);

//     const index = post.likes.findIndex((id) => id ===String(req.userId));

//     if (index === -1) {
//       post.likes.push(req.userId);
//     } else {
//       post.likes = post.likes.filter((id) => id !== String(req.userId));
//     }
//     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
//     res.status(200).json(updatedPost);
// }



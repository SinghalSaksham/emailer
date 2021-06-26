import mongoose from 'mongoose';

const mailSchema = mongoose.Schema({
    to: String,
    cc: String,
    subject: String,
    message: String,
    from: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var MailMessage = mongoose.model('MailMessage', mailSchema);

export default MailMessage;
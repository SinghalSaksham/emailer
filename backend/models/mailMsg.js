import mongoose from "mongoose";

const mailSchema = mongoose.Schema({
  to: { type: String, required: true },
  cc: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type:String, required: true },
  from: { type: String},
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var MailMessage = mongoose.model("MailMessage", mailSchema);

export default MailMessage;

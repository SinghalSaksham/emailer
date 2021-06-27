const express = require('express')
// import bodyParser from 'body-parser';
var bodyParser = require('body-parser')
// import mongoose from 'mongoose';
const mongoose = require('mongoose');
// import cors from 'cors';
var cors = require('cors')

import mailRoutes from './routes/mails.js';
import userRouter from "./routes/user.js";

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/mail', mailRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = 'mongodb+srv://mahir29:mahir29@cluster0.feiib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
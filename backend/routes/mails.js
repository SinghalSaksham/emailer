// import express from 'express';
const express = require('express')

// import { createMail, getMails } from '../controllers/mails.js';
import createMail from '../controllers/mails.js';
import getMails from '../controllers/mails.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.post('/mails',auth,createMail);
router.get('/mails',auth,getMails);


export default router;
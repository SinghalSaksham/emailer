import express from 'express';

import { createMail, getMails } from '../controllers/mails';

const router = express.Router();
import auth from "../middleware/auth.js";

router.post('/',auth,createMail);
router.get('/',auth,getMails)


export default router;
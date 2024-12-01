import express from 'express';
import {sendMessage, getMessage} from "../controller/messageController.js"
import {authjwt} from "../jwt/jsonWebToken.js";

const router = express.Router();

// POST route to handle user signup
router.post('/send/:id',authjwt, sendMessage );
router.get('/get/:id', authjwt, getMessage );


export default router;
import express from 'express';
import {login, signup, getAllUsers} from '../controller/userController.js'; 
import {authjwt} from "../jwt/jsonWebToken.js";

const router = express.Router();

// POST route to handle user signup
router.post('/signup', signup);
router.post('/login', login);
router.get('/allusers',authjwt, getAllUsers );

export default router;  // Export the router using ES Module syntax

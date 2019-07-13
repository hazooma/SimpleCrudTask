import express from 'express';
import { create, login } from '../controllers/AuthController';

const router = express.Router();

router.get('/', (req, res) => res.send('Hello World!'));

// Create an Authentication . (Login/signup)
router.post('/register', create);
router.post('/login', login);

export default router;

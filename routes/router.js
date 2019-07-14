import express from 'express';
import { create, login } from '../controllers/AuthController';
// import {
//   list, save, update, remove,
// } from '../controllers/PostController';

const router = express.Router();

router.get('/', (req, res) => res.send('Hello World!'));

// Create an Authentication . (Login/signup)
router.post('/register', create);
router.post('/login', login);

// router.get('/posts', list);
// router.get('/posts/:id', list);
// router.post('/add', save);
// router.post('/update/:id', update);
// router.post('/delete/:id', remove);

export default router;

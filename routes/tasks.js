import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addTask, getTask, updateTask, deleteTask} from './../controllers/tasks.js'

const router = express.Router();

router.post('/new', isAuthenticated, addTask);

router.get('/all', isAuthenticated, getTask);

router.route('/:id')
.put(isAuthenticated, updateTask)
.delete(isAuthenticated, deleteTask)

export default router;  
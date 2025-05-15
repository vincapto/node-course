import express from 'express';
import userController from '../controllers/userController.js';
import validateUuid from '../middlewares/validateUuid.js';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:userId', validateUuid, userController.updateUser);
router.delete('/:userId', validateUuid, userController.deleteUser);

export default router;
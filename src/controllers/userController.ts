import { Request, Response } from 'express';
import userModel from '../models/userModel.js';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userModel.isValidUuid(userId)) {
        res.status(400).json({ message: 'Invalid user ID format' });
        return;
    }
    try {
        const user = await userModel.getUserById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { username, age, hobbies } = req.body;
    if (!username || !age || !Array.isArray(hobbies)) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }

    try {
        const createdUser = await userModel.createUser( 
            username,
            age,
            hobbies,
        );
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userModel.isValidUuid(userId)) {
        res.status(400).json({ message: 'Invalid user ID format' });
        return;
    }
    const { username, age, hobbies } = req.body;
    try {
        const updatedUser = await userModel.updateUser(userId, { username, age, hobbies });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userModel.isValidUuid(userId)) {
        res.status(400).json({ message: 'Invalid user ID format' });
        return;
    }
    try {
        const deleted = await userModel.deleteUser(userId);
        if (!deleted) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
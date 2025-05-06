import { v4 as uuidv4 } from 'uuid';

interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

const users = new Map<string, User>();

const createUser = (user: Omit<User, 'id'>): User => {
    const id = uuidv4();
    const newUser = { id, ...user };
    users.set(id, newUser);
    return newUser;
};

const getUserById = (id: string): User | undefined => {
    return users.get(id);
};

const getAllUsers = (): User[] => {
    return Array.from(users.values());
};

const updateUser = (id: string, updatedData: Partial<Omit<User, 'id'>>): User | null => {
    if (!users.has(id)) {
        return null;
    }
    const existingUser = users.get(id)!;
    const updatedUser = { ...existingUser, ...updatedData };
    users.set(id, updatedUser);
    return updatedUser;
};

const deleteUser = (id: string): boolean => {
    return users.delete(id);
};

export { createUser, getUserById, getAllUsers, updateUser, deleteUser };

export default {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
};
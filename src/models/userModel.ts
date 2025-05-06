import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export interface IUser {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

let users: IUser[] = [];

export default {
    getAllUsers: (): IUser[] => {
        return users;
    },
    getUserById: (userId: string): IUser | undefined => {
        return users.find(user => user.id === userId);
    },
    createUser: (username: string, age: number, hobbies: string[]): IUser => {
        const newUser = {
            id: uuidv4(),
            username,
            age,
            hobbies
        };
        users.push(newUser);
        return newUser;
    },
    updateUser: (userId: string, updatedData: Partial<IUser>): IUser | null => {
        const index = users.findIndex(user => user.id === userId);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedData };
            return users[index];
        }
        return null;
    },
    deleteUser: (userId: string): boolean => {
        const index = users.findIndex(user => user.id === userId);
        if (index !== -1) {
            users.splice(index, 1);
            return true;
        }
        return false;
    },
    isValidUuid: (id: string): boolean => {
        return uuidValidate(id);
    }
};
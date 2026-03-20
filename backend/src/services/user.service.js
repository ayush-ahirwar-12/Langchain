import jwt from 'jsonwebtoken';
import mongoUserRepository from '../repositories/implementations/mongoUserRepository.js';

class UserService {
    constructor() {
        this.userRepository = new mongoUserRepository();
    }

    async register(userData) {
        const existingUser = await this.userRepository.findUserbyEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const user = await this.userRepository.createUser(userData);
        return user;
    }

    async login(email, password) {
        const user = await this.userRepository.findUserbyEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    }

    async update(userId, updateData) {
        const user = await this.userRepository.update(userId, updateData);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async logout() {
        // For stateless JWT, logout is handled client-side by removing token
        return { message: 'Logged out successfully' };
    }
}

export default UserService;
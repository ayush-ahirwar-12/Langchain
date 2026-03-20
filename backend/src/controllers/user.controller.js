import UserService from '../services/user.service.js';

const userService = new UserService();

class UserController {
    async register(req, res) {
        try {
            const user = await userService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await userService.login(email, password);
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const userId = req.params.id; // assuming id from params
            const updateData = req.body;
            const user = await userService.update(userId, updateData);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async logout(req, res) {
        try {
            const result = await userService.logout();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new UserController();
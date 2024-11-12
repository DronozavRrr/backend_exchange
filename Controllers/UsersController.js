import users from "../Entitys/users.js";
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

class UsersController
{
    async isUniqueUser(user) {
        try {
            const existingUser = await users.findOne({
                email: user.email,

            });
            return existingUser === null; 
        } catch (e) {
            console.error('Ошибка при проверке уникальности пользователя:', e);
            throw new Error('Ошибка при проверке уникальности пользователя');
        }
    }
    async getProfile(req, res) {
        try {
            if (!req.user || !req.user.id) {
                return res.status(400).json({ message: 'Ошибка авторизации: пользователь не определён' });
            }
    
            const userId = req.user.id;
            console.log('userId:', userId);
    
            const user = await users.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            res.json(user);
        } catch (error) {
            console.error("Ошибка при получении профиля:", error);
            res.status(500).json({ message: "Ошибка сервера при получении профиля" });
        }
    }
    
    
    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const { email, password, role } = req.body;
            const isUnique = await this.isUniqueUser({ email })
            if (!isUnique) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' });
            }
            const hashedPassword = bcrypt.hashSync(password, 10); 
            const user = await users.create({ email, password: hashedPassword, role });

            res.json(user);
        } catch (e) {
            console.log(e)
            res.status(500).json(e);
        }
    }
    async getAll(req,res)
    {
        try{
            const all_users = await users.find()
            return res.json(all_users)
        }catch(e)
        {
            
            res.status(500).json(e)
        }

    }
    async getOne(req,res)
    {
        try{
            const {id} = req.params
            if(!id)
            {
                res.status(400).json({message:'id не указан'})
            }
            const need_user = await users.findById(id)
            return res.json(need_user)
        }catch(e)
        {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const userData = req.body;  
    
            if (!userData._id) {
                return res.status(400).json({ message: 'id не указан' });
            }
            const isUnique = await this.isUniqueUser(userData);
            if (!isUnique) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' });
            }

            const updatedUser = await users.findByIdAndUpdate(userData._id, userData, { new: true });
    
            if (!updatedUser) {
                return res.status(404).json({ message: 'User не найдена' });
            }
    
            return res.json(updatedUser);
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }
    async deleteId(req, res) {
        try {
            const { id } = req.params;
    
            if (!id) {
                return res.status(400).json({ message: 'id не указан' });
            }
    
            const deletedUser = await users.findByIdAndDelete(id);
    
            if (!deletedUser) {
                return res.status(404).json({ message: 'Пара не найдена' });
            }
    
            return res.json({ message: 'Пара успешно удалена' });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }
    
    
    
}

export default new UsersController();
import users from "./users.js";
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

class UsersController
{
    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { email, password, role } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10); 
            const user = await users.create({ email, password, role });
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

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import users from "../Entitys/users.js";
import Log from "../Entitys/logs.js"; 

class AuthController {


    createLog = async (userId, action, details = {}) => {
        try {
            const log = new Log({
                userId,
                action,
                details
            });
            await log.save();
        } catch (error) {
            console.error('Ошибка при создании лога:', error);

        }
    }


    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await users.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден" });
            }
            

            const isPassValid = bcrypt.compareSync(password, user.password);
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(400).json({ message: "Неверный пароль" });
                }
                console.log('Password valid:', isMatch); // true, если всё правильно
            });



            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            
            console.log("Generated token payload:", { id: user._id, role: user.role }); // Log payload
            
            // Создание лога о входе
            await this.createLog(user._id, 'login', { email: user.email, role:user.role });
            return res.json({ token });
        } catch (e) {
            console.log(e)
            console.log("JWT_SECRET:", process.env.JWT_SECRET);
            res.status(500).json({ error: e.message });
        }
    }
}

export default new AuthController();

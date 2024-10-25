import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import users from "../Entitys/users.js";
class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await users.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден" });
            }

            const isPassValid = bcrypt.compareSync(password, user.password);
            if (!isPassValid) {
                return res.status(400).json({ message: "Неверный пароль" });
            }

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.json({ token });
        } catch (e) {
            console.log(e)
            console.log("JWT_SECRET:", process.env.JWT_SECRET);
            res.status(500).json({ error: e.message });
        }
    }
}

export default new AuthController();

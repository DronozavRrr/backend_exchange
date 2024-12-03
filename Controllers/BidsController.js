// Controllers/BidsController.js
import bids from "../Entitys/bids.js";
import exchanges from "../Entitys/exchanges.js";
import pairs from "../Entitys/pairs.js";
import users from "../Entitys/users.js";
import Log from "../Entitys/logs.js"; // Импорт модели Log

class BidsController {
    // Вспомогательная функция для создания лога
    async createLog(userId, action, details = {}) {
        try {
            const log = new Log({
                userId,
                action,
                details
            });
            await log.save();
        } catch (error) {
            console.error('Ошибка при создании лога:', error);
            // Не выбрасывайте ошибку, чтобы не прерывать основной процесс
        }
    }

    async create(req, res) {
        try {
            const values = req.body;
            const bid = await bids.create(values);
            const pair = await pairs.findById(values.pair_id);
            const user = await users.findById(values.user_id);
            res.json({ bid, pair, user });

            // Создание лога
            await this.createLog(req.user.id, 'create_bid', { bidId: bid._id, userId: user._id, pairId: pair._id, amount: bid.amount });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const allBids = await bids.find();
            return res.json(allBids);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOneId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'id не указан' });
            }
            const bid = await bids.findById(id);
            if (!bid) {
                return res.status(404).json({ message: 'Заявка не найдена' });
            }
            const pair = await pairs.findById(bid.pair_id);
            return res.json({ bid, pair });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const bidData = req.body;
            if (!bidData._id) {
                return res.status(400).json({ message: 'id не указан' });
            }
            const updatedBid = await bids.findByIdAndUpdate(bidData._id, bidData, { new: true });
            return res.json(updatedBid);

            // Создание лога
            // await this.createLog(req.user.id, 'update_bid', { bidId: updatedBid._id, amount: updatedBid.amount });
            // Поместите выше код после обновления и перед возвратом
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async deleteId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'id не указан' });
            }
            const deletedBid = await bids.findByIdAndDelete(id);
            return res.json({ message: 'Заявка успешно удалена', deletedBid });

            // Создание лога
            // await this.createLog(req.user.id, 'delete_bid', { bidId: deletedBid._id });
            // Поместите выше код после удаления и перед возвратом
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new BidsController();

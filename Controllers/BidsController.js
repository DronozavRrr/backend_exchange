import bids from "../Entitys/bids.js";
import exchanges from "../Entitys/exchanges.js";
import pairs from "../Entitys/pairs.js";
import users from "../Entitys/users.js";

class BidsController {
    async create(req, res) {
        try {
            const values = req.body;
            const bid = await bids.create(values);
            const pair = await pairs.findById(values.pair_id);
            const user = await users.findById(values.user_id);
            res.json({ bid, pair, user });
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
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new BidsController();

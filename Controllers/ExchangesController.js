import exchanges from "../Entitys/exchanges.js";
import pairs from "../Entitys/pairs.js";

class ExchangesController {
    async create(req, res) {
        try {
            const { amount, user_id, pair_id } = req.body;
            const exchange = await exchanges.create({ amount, user_id,pair_id });
            const pair = await pairs.findById(pair_id)
            res.json({exchange,pair});
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const all_exchanges = await exchanges.find();
            return res.json(all_exchanges);
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
            const exchange = await exchanges.findById(id);
            const pair = await pairs.findById(pair_id)
            return res.json({exchange,pair});
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const exchangeData = req.body;
            if (!exchangeData._id) {
                return res.status(400).json({ message: 'id не указан' });
            }
            const updatedExchange = await exchanges.findByIdAndUpdate(exchangeData._id, exchangeData, { new: true });
            return res.json(updatedExchange);
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
            const deletedExchange = await exchanges.findByIdAndDelete(id);
            return res.json({ message: 'Обмен успешно удален', deletedExchange });
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new ExchangesController();

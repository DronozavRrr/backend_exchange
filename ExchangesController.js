import exchanges from "./exchanges.js";

class ExchangesController {
    async create(req, res) {
        try {
            const { what_from, what_to, amount, rate, user_id } = req.body;
            const exchange = await exchanges.create({ what_from, what_to, amount, rate, user_id });
            res.json(exchange);
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
            return res.json(exchange);
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

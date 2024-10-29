import pairs from "../Entitys/pairs.js";

class PairsService {
    async create(pair) {
        const createdPair = await pairs.create(pair);
        console.log('Pair created:', pair);
        return createdPair;
    }

    async getAll(req, res) {
        try {
            const all_pairs = await pairs.find();
            console.log('Fetched pairs:', all_pairs); // Логирование полученных пар
            return res.json(all_pairs);
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }
    

    async getOneId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'id не указан' });
            }
            const need_pair = await pairs.findById(id);
            if (!need_pair) {
                return res.status(404).json({ message: 'Пара не найдена' });
            }
            return res.json(need_pair);
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    async getOneName(name) {
        try {
            const need_pair = await pairs.find({ first_crypto: name });
            return need_pair;
        } catch (e) {
            console.error('Error fetching pair by name:', e);
            throw new Error('Database error while fetching pair by name');
        }
    }
    

    async update(req, res) {
        try {
            const pairData = req.body;  

            if (!pairData._id) {
                return res.status(400).json({ message: 'id не указан' });
            }

            const updatedPair = await pairs.findByIdAndUpdate(pairData._id, pairData, { new: true });

            if (!updatedPair) {
                return res.status(404).json({ message: 'Пара не найдена' });
            }

            return res.json(updatedPair);
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
    
            const deletedPair = await pairs.findByIdAndDelete(id);
    
            if (!deletedPair) {
                return res.status(404).json({ message: 'Пара не найдена' });
            }
    
            // Возвращаем удаленный объект для дальнейшей обработки
            return deletedPair;
        } catch (e) {
            console.error('Error deleting pair by ID:', e);
            throw new Error('Ошибка при удалении пары');
        }
    }

    async deleteName(req, res) {
        try {
            const { name } = req.params;

            if (!name) {
                return res.status(400).json({ message: 'Имя не указано' });
            }

            const deletedPair = await pairs.findOneAndDelete({ first_crypto: name });

            if (!deletedPair) {
                return res.status(404).json({ message: 'Пара с таким именем не найдена' });
            }

            return res.json({ message: 'Пара успешно удалена', deletedPair });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }
}

export default new PairsService();

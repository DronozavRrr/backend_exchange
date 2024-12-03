import pairs from "../Entitys/pairs.js";
import { validationResult } from 'express-validator';
import PairsService from "../Services/PairsService.js";

class PairsController {
    async isUniquePair(pair) {
        try {
            const existingPair = await pairs.findOne({
                first_crypto: pair.first_crypto,
                second_crypto: pair.second_crypto
            });
            return pair !== existingPair
            return (existingPair === null ); 
        } catch (e) {
            console.error('Ошибка при проверке уникальности пары:', e);
            throw new Error('Ошибка при проверке уникальности пары');
        }
    }

    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const pair = req.body;
            const isUnique = await this.isUniquePair(pair);
            if (!isUnique) {
                return res.status(400).json({ message: 'Пара с такими значениями уже существует' });
            }

            const createdPair = await PairsService.create(pair);
            return res.json(createdPair);
        } catch (e) {
            return res.status(500).json({ message: 'Ошибка на сервере', error: e.message });
        }
    }

    async getAll(req, res) {
        try {
            const allPairs = await PairsService.getAll();
            return res.json(allPairs);
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

            const needPair = await PairsService.getOneId(id);
            if (!needPair) {
                return res.status(404).json({ message: 'Пара не найдена' });
            }
            return res.json(needPair);
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    async getOneName(req, res) {
        try {
            const { name } = req.params;
            if (!name) {
                return res.status(400).json({ message: 'name не указан' });
            }

            const needPair = await PairsService.getOneName(name);
            if (!needPair.length) {
                return res.status(404).json({ message: 'Пара не найдена' });
            }
            return res.json(needPair);
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    async update(req, res) {
        try {
            const pairData = req.body;
            if (!pairData._id) {
                return res.status(400).json({ message: 'id не указан' });
            }

            const existingPair = await pairs.findById(pairData._id);
            if (!existingPair) {
                return res.status(404).json({ message: 'Пара не найдена' });
            }

            const isUnique = await this.isUniquePair(pairData);
            if (!isUnique) {
                return res.status(400).json({ message: 'Пара с такими значениями уже существует' });
            }

            const updatedPair = await PairsService.update(pairData);
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

            const deletedPair = await PairsService.deleteId(id);
            if (!deletedPair) {
                return res.status(404).json({ message: 'Пара не найдена' });
            }

            return res.json({ message: 'Пара успешно удалена', deletedPair });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    async deleteName(req, res) {
        try {
            const { name } = req.params;
            if (!name) {
                return res.status(400).json({ message: 'Имя не указано' });
            }

            const deletedPair = await PairsService.deleteName(name);
            if (!deletedPair) {
                return res.status(404).json({ message: 'Пара с таким именем не найдена' });
            }

            return res.json({ message: 'Пара успешно удалена', deletedPair });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }
}

export default new PairsController();

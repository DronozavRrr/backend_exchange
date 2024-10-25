import pairs from "../Entitys/pairs.js";

class PairsService
{
    async create(pair) {
            const createdPair = await pairs.create(pair)
            console.log('Pair created:', pair);
            return createdPair;

    }
    async getAll(req,res)
    {
        try{
            const all_pairs = await pairs.find()
            return res.json(all_pairs)
        }catch(e)
        {
            
            res.status(500).json(e)
        }

    }
    async getOneId(req,res)
    {
        try{
            const {id} = req.params
            if(!id)
            {
                res.status(400).json({message:'id не указан'})
            }
            const need_pair = await pairs.findById(id)
            return res.json(need_pair)
        }catch(e)
        {
            res.status(500).json(e)
        }
    }
    async getOneName(req, res) {
        try {
            const { name } = req.params;  
            console.log(name)
    
            if (!name) {
                return res.status(400).json({ message: 'name не указан' });
            }
    
            const need_pair = await pairs.find({ first_crypto: name });
    
            if (!need_pair) {
                return res.status(404).json({ message: 'Пара не найдена' });
            }
    
            return res.json(need_pair);
        } catch (e) {
            res.status(500).json({ error: e.message });
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
    
            return res.json({ message: 'Пара успешно удалена' });
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
            const deletedPair = await pairs.findOneAndDelete({ first_crypto: name });
    
            if (!deletedPair) {
                return res.status(404).json({ message: 'Пара с таким именем не найдена' });
            }
    
            return res.json({ message: 'Пара успешно удалена',deletedPair });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }
}

export default new PairsService
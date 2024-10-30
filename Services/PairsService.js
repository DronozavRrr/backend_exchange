import pairs from "../Entitys/pairs.js";

class PairsService {
    async create(pair) {
        const createdPair = await pairs.create(pair);
        return createdPair;
    }

    async getAll() {
        return await pairs.find();
    }

    async getOneId(id) {
        return await pairs.findById(id);
    }

    async getOneName(name) {
        return await pairs.find({ first_crypto: name });
    }

    async update(pairData) {
        return await pairs.findByIdAndUpdate(pairData._id, pairData, { new: true });
    }

    async deleteId(id) {
        return await pairs.findByIdAndDelete(id);
    }

    async deleteName(name) {
        return await pairs.findOneAndDelete({ first_crypto: name });
    }
}

export default new PairsService();

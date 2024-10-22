import mongoose from "mongoose";

const exchanges = new mongoose.Schema(
    {
        amount: { type: Number, required: true },     // Количество
        user_id: { type: String, required: true },    // ID пользователя, который обменял
        pair_id: { type: String, required: true }, // ID пары, который обменял
    },
    { timestamps: true } 
);

export default mongoose.model("Exchanges", exchanges);

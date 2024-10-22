import mongoose from "mongoose";

const exchanges = new mongoose.Schema(
    {
        what_from: { type: String, required: true },  // Что меняем
        what_to: { type: String, required: true },    // На что меняем
        amount: { type: Number, required: true },     // Количество
        rate: { type: Number, required: true },       // Курс обмена
        user_id: { type: String, required: true },    // ID пользователя, который обменял
    },
    { timestamps: true } 
);

export default mongoose.model("Exchanges", exchanges);

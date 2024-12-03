import mongoose from "mongoose";

const bids = new mongoose.Schema(
    {
        amount: { type: Number, required: true },     // Количество
        type:{ type: String, required: true },    // фиат или крипто
        to:{ type: String, required: true },   // номер карты или адресс кошелька
        user_id: { type: String, required: true },    // ID пользователя, который отправил заявку
        pair_id: { type: String, required: true }, // ID пары,что меняет
    },
    { timestamps: true } 
);

export default mongoose.model("Bids", bids);

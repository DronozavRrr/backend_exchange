import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  action: { type: String, required: true },
  details: { type: mongoose.Schema.Types.Mixed }, // Для дополнительной информации
  timestamp: { type: Date, default: Date.now }
});

export default  mongoose.model('Log', logSchema);
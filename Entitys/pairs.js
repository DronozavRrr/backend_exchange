import mongoose from "mongoose";

const pairs = new mongoose.Schema(
    {
        first_crypto:{type:String,required:true},
        second_crypto:{type:String,required:true},
        course:{type:String,required:true}

    }
)

export default mongoose.model("Pairs",pairs)
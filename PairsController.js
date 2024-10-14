import pairs from "./pairs.js";

class PairsController
{
    async create(req,res)
    {
        {
            try{
            const {first_crypto,second_crypto,course} = req.body;
            const pair = await pairs.create({ first_crypto,second_crypto,course })
            res.json(pair)
        }
        catch(e)
        {
            res.status(500).json(e)
        }
        }
    }
}

export default new PairsController();
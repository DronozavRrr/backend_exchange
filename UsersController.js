import users from "./users.js";

class UsersController
{
    async create(req,res)
    {
        {
            try{
            const {email,password,role} = req.body;
            const user = await users.create({email,password,role})
            res.json(user)
        }
        catch(e)
        {
            res.status(500).json(e)
        }
        }
    }
    async getAll(req,res)
    {
        try{
            const all_users = await users.find()
            return res.json(all_users)
        }catch(e)
        {
            
            res.status(500).json(e)
        }

    }
}

export default new UsersController();
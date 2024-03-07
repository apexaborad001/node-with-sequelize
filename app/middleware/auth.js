
const db = require("../model");
const config=require("../config/auth.config");
const jwt = require('jsonwebtoken');
const { decode } = require('jsonwebtoken');
const User = db.users;


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        jwt.verify(token,config.secret,(err,decode)=>{
            if(err){
                throw new Error("Unauthorized!")
                    // message:"Unauthorized!!"
                // })
            }

        })
        const user = await User.findOne({ email: decode.email })

        if (!user) {
            throw new Error("user not found")
        }

        req.user = user
        next()
    } catch (e) {
        // console.log(e.message)
        res.status(401).send({ error: e.message })
    }
}

module.exports = auth
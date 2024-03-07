const db =require("../model")
const User=db.users

checkDuplicateEmail=(req,res,next)=>{
    User.findOne({
        where:{
            Email:req.body.Email
        }
    }).then(user=>{
        if(user){
            res.status(400).send({
                message:"failed! email is already in use"
            })
            return
        }
        next()
    })
}

module.exports=checkDuplicateEmail
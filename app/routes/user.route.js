const verifySignUp=require('../middleware/verifySignUp')
// const controller=require()
const auth = require('../middleware/auth')
module.exports=app=>{
    const users=require('../controller/user.controller')
    let router =require('express').Router()
    router.post('/createRecord',verifySignUp,users.signUp)
    router.get("/getAllRecord",users.findAll)
    router.get("/findwithid/:id",users.signIn)
    router.put("/updateRecord",auth,users.update)
    router.delete("/deletewithid/:id",users.delete)
    router.delete("/delete",users.deleteAll)
    router.put("/resetPassword",auth,users.ResetPassword)

    app.use('/api',router)
}
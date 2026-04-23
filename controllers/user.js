const User=require("../models/user");
const {setUser}=require("../service/auth");
const {v4:uuid}=require("uuid");
const handleUserSignup=async(req,res)=>{
    const {name,email,password}=req.body;
    await User.create({
        name,email,password,
    });
    return res.redirect("/login");
}

const handleUserLogin=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({
        email,password,
    });
    if(!user) return res.render('login',{
        error:"Invalid username or password"
    });
    const sessionId=uuid();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect("/");
}

module.exports={
    handleUserSignup,
    handleUserLogin
};
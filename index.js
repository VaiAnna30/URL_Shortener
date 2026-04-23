const express=require("express");
const path=require("path");
const {connectToMongoDB}=require('./connect');
const cookieParser=require("cookie-parser");
const {restrictToAuthenticatedUser,checkAuth}=require("./middleware/auth");

const URL=require('./models/url');
const app=express();
const PORT=8001;


const urlRoute=require('./routes/url');
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user');

connectToMongoDB('mongodb://localhost:27017/url-short')
    .then(()=>console.log(`mongodb connected`));

app.set('view engine','ejs');
app.set('views',path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/',checkAuth,staticRoute);
app.use('/user',userRoute);
app.use("/url",restrictToAuthenticatedUser,urlRoute);

app.get('/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{timestamp:Date.now()}}})
    
    if(entry){
        return res.redirect(entry.redirectURL);
    }else {
        // This prevents the server from hanging if the ID isn't found
        return res.status(404).send("URL not found"); 
    }
});

app.listen(PORT,()=>console.log(`Server Started at Port ${PORT}`));
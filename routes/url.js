const express=require('express');
const router=express.Router();

const {handlegenerateNewShortURL}=require("../controllers/url")
const {handleGetAnalytics}=require("../controllers/url")
router.post('/',handlegenerateNewShortURL);

router.get('/analytics/:shortId',handleGetAnalytics); 

module.exports=router;
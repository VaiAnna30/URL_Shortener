const {nanoid}=require("nanoid");

const URL=require('../models/url');
 
async function handlegenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).end("Bad request");
    const shortID=nanoid(8);
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
    });
    return res.json({id:shortID});
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const entry=await URL.findOne({shortId});
    if(!entry){
        return res.status(404).json({error:'URL not found'});
    }
    res.json({
        totalClicks:entry.visitHistory.length,
        clicks:entry.visitHistory
    });
}

module.exports={
    handlegenerateNewShortURL,handleGetAnalytics,
};
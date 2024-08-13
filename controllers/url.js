const crypto = require('crypto');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'});
   const shortID = crypto.randomBytes(4).toString('hex');
   await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
   });

   return res.json({id: shortID});
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortID: shortId})
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory})
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}
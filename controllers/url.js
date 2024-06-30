const { nanoid } = require('nanoid');
const {URL} = require('../models/url');


const handleGenerateShortUrl = async(req, res) => {
    const body = req.body;
    const allUrls = await URL.find({});
    
    if  (!body.url){
        return res.status(400).json({message: "URL is required"});
    }
    
    const nanoId = nanoid(8);
        
    await URL.create({
        shortID: nanoId,
        redirectUrl : body.url,
        visitHistory: []
    })
    return res.render("home", {
        id: nanoId,
        urls: allUrls
    })
}

const handleRedirectUrl = async (req, res) => {
    const shortID = req.params.shortId;

    console.log(`Short Id is ${shortID}`);

    const entry = await URL.findOneAndUpdate
    ({shortID},
        {$push: {
            visitHistory: {timestamp: Date.now()},
        }
});
console.log(`Redirect Url is: ${entry.redirectUrl}`);
res.redirect(entry.redirectUrl);
}

const handleUrlAnalytics = async(req, res) =>{
    const shortID = req.params.shortId;
    const result = await URL.findOne({shortID});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
    
}
const handleHomeRender = async(req,res)=>{
    const allUrls = await URL.find({});
    return res.render("home", 
    {
        urls: allUrls
    }
    );
}

module.exports = {
    handleGenerateShortUrl,
    handleRedirectUrl,
    handleUrlAnalytics,
    handleHomeRender,
}
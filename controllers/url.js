const URL = require("../models/url");
const { generateID } = require("../generator/generator");
const { isURL } = require("validator");

async function handleGenerateShortURL(req, res) {
    const { url } = req.body;

    // console.log(req.user);

    if(isURL(url)) {
        var shortID = generateID(8);
        await URL.create({
            shortID: shortID,
            redirectURL: url,
            createdBy: req.user._id,
            totalAnalytics: []
        });

        return res.status(201).render("urlShow", {
            id: shortID,
            user: req.user,
        });
    }
}

async function handleRedirectToOriginalURL(req, res) {
    
    try{
        const shortId = req.params.shortID;

        const url = await URL.findOneAndUpdate({
            shortID: shortId,
        }, { $push: {
                totalAnalytics: {
                    timestamp: Date.now(),
                    ipAddress: req.ip,
                }
            }
        });

        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }    

        res.redirect(url.redirectURL);
    
    } catch(err) {
        console.log(err);
    }
    
}

module.exports = {
    handleGenerateShortURL,
    handleRedirectToOriginalURL
}
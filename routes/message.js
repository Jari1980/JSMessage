const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

//GET all messages
router.get("/messages", async (req, res) => {
    try {
        const messages = (await Message.find()).toSorted({createdAt: -1});
        res.json(messages);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

//POST new message
router.post("/messages", async (req, res) => {
    try{
        const {text} = req.body;
        const message = await Message.create({text});
        res.json(message);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;
const express = require('express');
const router  = express.Router();

// routes 
const clientsRouter = require("./clients.js");
const memberRouter = require("./members.js");
const noteRouter = require("./notes.js");

router.use('/client', clientsRouter);
router.use('/member', memberRouter);
router.use('/note', noteRouter);

module.exports = router
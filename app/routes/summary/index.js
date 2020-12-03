const express = require("express");
const router = express.Router();

const jobRouter = require("./jobs");
router.use("/jobs", jobRouter);

module.exports = router;

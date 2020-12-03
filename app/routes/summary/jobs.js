const express = require("express");
const router = express.Router();
const {
  getCounts,
} = require("../../clients/slurm17_db.js");
const utils = require("../../utils");
/**
 * @swagger
 * /summary/jobs/count:
 *   get:
 *     description: Get count of submitted jobs by granularity
 *     parameters:
 *      - name: granularity
 *        in: query
 *        description: Which granularity to get the data (month, day, hour)
 *        required: false
 *        default: day
 *        type: string
 *     responses:
 *       200:
 *         description: Success! New content is now available.
 *
 */

// Ex:  http://localhost:3004/summary/jobs/count?granularity=month

router.get("/count", (req, res, next) => {
  let granularity = req.query.granularity ?? 'day';
  let counts = getCounts()
  .then( (val) => {
    res.send(utils.getAtGranularity(val, granularity, 'count'))
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;

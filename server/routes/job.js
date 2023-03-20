const express = require("express")
const router = express.Router()

const { getJobs, createJob } = require("../controllers/job")

router.route("/").get(getJobs).post(createJob)

module.exports = router

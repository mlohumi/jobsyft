const express = require("express")
const router = express.Router()

const { getJobs, createJob, getJobDetails } = require("../controllers/job")

router.route("/").get(getJobs).post(createJob)

router.route("/:slug").get(getJobDetails)

module.exports = router

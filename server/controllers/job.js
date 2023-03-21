const Job = require("../model/Job")

// Define controller functions for handling HTTP requests
const getJobs = async (req, res) => {
  try {
    if (
      isNaN(Number(req.query.limit)) ||
      isNaN(Number(req.query.skip)) ||
      Number(req.query.limit) > 50
    ) {
      return res
        .status(500)
        .json({ message: "Please enter the valid limit and skip" })
    }

    const limitValue = req.query.limit || 2
    const skipValue = req.query.skip || 0
    const jobs = await Job.find()
      .limit(limitValue)
      .skip(skipValue)
      .select(
        "jobTitle companyName location salary experience logoPath slug createdAt"
      )
    // const {}
    res.status(200).json(jobs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createJob = async (req, res) => {
  try {
    const job = new Job(req.body)
    await job.save()
    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getJobDetails = async (req, res) => {
  try {
    if (!req.params.slug || typeof req.params.slug !== "string") {
      return res
        .status(500)
        .json({ message: "Please enter the valid slug string" })
    }

    const jobsDetails = await Job.findOne({ slug: req.params.slug })
    // const {}

    if (!jobsDetails) {
      res
        .status(404)
        .json({ message: "No Job Details found for the given slug" })
    }
    res.status(200).json(jobsDetails)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getJobs,
  createJob,
  getJobDetails,
}

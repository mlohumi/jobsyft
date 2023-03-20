const Job = require("../model/Job")

// Define controller functions for handling HTTP requests
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
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

module.exports = {
  getJobs,
  createJob,
}

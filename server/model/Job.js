const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
    },
    companyName: {
      type: String,
    },
    jobDescription: {
      type: String,
    },
    location: {
      type: Array,
    },
    salary: {
      type: String,
    },
    experience: {
      type: String,
    },
    skills: {
      type: Array,
    },
    jdUrl: {
      type: String,
    },
    employmentType: {
      type: String,
    },
    jobType: {
      type: String,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true }, versionKey: false }
)

const Job = mongoose.model("Job", jobSchema)

module.exports = Job

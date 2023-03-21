const axios = require("axios")
const Job = require("../model/Job")

// Define a function to fetch jobs from the Google Talent API and store them in the database
const fetchJobs = async () => {
  try {
    let info = []
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://www.naukri.com/jobapi/v3/search?urlType=search_by_keyword&searchType=adv&keyword=developer&sort=f&pageNo=1&seoKey=developer-jobs&src=sortby&latLong=&noOfResults=100&jobAge=1",
      headers: {
        appid: "109",
        systemid: "109",
      },
    }
    var res = await axios(config)
    var jobId = res.data.jobDetails.map((jobId) => jobId.jobId)

    for (let i = 0; i < jobId.length; i++) {
      var config2 = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://www.naukri.com/jobapi/v4/job/${jobId[i]}`,
        headers: {
          accept: "application/json",
          appid: "121",
          "content-type": "application/json",
          systemid: "Naukri",
        },
      }
      let res2 = await axios(config2)
      let apiData = res2.data.jobDetails

      let prefKeyskills = apiData.keySkills.preferred.map((data) => data.label)
      let otherkeyskills = apiData.keySkills.other.map((data) => data.label)

      const slugify = (str) =>
        str
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")

      let slug = slugify(
        `${apiData.title} ${apiData.locations[0].label} job opening ${jobId[i]}`
      )
      let finalDetails = {
        jobTitle: apiData.title,
        education: apiData.education,
        employmentType: apiData.employmentType,
        jobDescription: apiData.description,
        companyName: apiData.companyDetail.name,
        skills: prefKeyskills.concat(otherkeyskills),
        experience: apiData.minimumExperience + " yrs",
        salary: apiData.salaryDetail.label,
        location: apiData.locations.map((data) => data.label),
        jdUrl: apiData.staticUrl,
        jobType: apiData.wfhLabel ? apiData.wfhLabel : "WFO",
        logoPath: apiData.logoPathV3 ? logoPathV3 : "C",
        slug: slug,
      }
      info.push(finalDetails)
    }
    let result = await Job.insertMany(info)
    console.log(`${result} documents were inserted`)
  } catch (error) {
    console.log("GOT UP AN ERROR")
    console.error(error)
  }
}

// ;(async () => {
//   console.log("MUKESH LOHUMI")
//   await fetchJobs()
// })()

// Define a cron job that runs the fetchJobs function every 5 minutes
// const cron = require("node-cron")

// cron.schedule("*/1 * * * *", async () => {
//   await fetchJobs()
// })

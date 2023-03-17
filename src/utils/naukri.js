var axios = require("axios")
;(async () => {
  let info = []
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://www.naukri.com/jobapi/v3/search?urlType=search_by_keyword&searchType=adv&keyword=developer&sort=f&pageNo=1&seoKey=developer-jobs&src=sortby&latLong=&noOfResults=100",
    headers: {
      appid: "109",
      systemid: "109",
    },
  }
  var res = await axios(config)
  // console.log(res.data.jobDetails[i].placeholders)
  for (let i = 0; i < res.data.jobDetails.length; i++) {
    let apiData = res.data.jobDetails[i]
    info.push({
      jobTitle: apiData.title,
      companyName: apiData.companyName,
      skills: apiData.tagsAndSkills,
      experience: apiData.placeholders[0].label,
      salary: apiData.placeholders[1].label,
      location: apiData.placeholders[2].label,
      jdUrl: "https://www.naukri.com" + apiData.jdURL,
      jobDescription: apiData.jobDescription,
    })
  }
  console.log(info)
})()

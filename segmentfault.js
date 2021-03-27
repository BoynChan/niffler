const axios = require("axios")
const fs = require("fs")
const segmentFaultURL = "https://segmentfault.com"

async function getPage() {
    let techPage = await axios.get(segmentFaultURL)
    let content = techPage.data.match(/window.g_initialProps = ([\s\S]*?);/)[1].replace(/undefined/g, 0)
    let articles = JSON.parse(content).portal.pageData.articles
    let data = []
    articles.forEach(element => {
        data.push({
            link: segmentFaultURL + element.url,
            text: element.title
        })
    });
    return data
}


getPage().then(data => {
    console.log(data)
})
const axios = require("axios")
const cheerio = require('cheerio');

const tabs = ["hot", "tech", "creative", "play"]
const v2exURL = "https://v2ex.com"
async function getPage(tab) {
    let techPage = await axios.get(v2exURL + "/?tab=" + tab)
    let $ = cheerio.load(techPage.data);
    let data = []
    $("div[class='cell item'] > table > tbody > tr > td:nth-child(3)").each((i, ele) => {
        let textTag = $(ele).children("span[class=item_title]")
        let link = textTag.children().attr("href")
        let text = textTag.text()
        let lastReply = $(ele).children("span[class=topic_info]").children("span").attr("title")
        data.push({
            link: v2exURL + link,
            text: text.replace(/\ +/g, "").replace(/[\r\n]/g, ""),
            last_reply: lastReply
        })
    })
    return data
}
getPage("hot").then(data => {
    console.log(data)
})
// console.log(hotData)
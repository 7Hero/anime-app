const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const anime = "https://www9.gogoanime.io";

GetPages = async () => {
    const alllinks = [];
    const animeName = [];
    let arr = [];

    for (let i = 0; i < 1; i++) {
        const { data } = await axios(
            `https://www9.gogoanime.io/anime-list.html?page=${i}`
        );
        alllinks.push(data);
        console.log(`pagina ${i}`)
    }

    for (let link of alllinks) {
        const $ = cheerio.load(link);

        $(
            "#wrapper_bg > section > section.content_left > div > div.anime_list_body > ul > li > a"
        ).each((idx, el) => {
            arr.push({
                title: $(el).text(),
                link: anime + $(el).attr("href"),
                linkHref: $(el)
                    .attr("href")
                    .replace("/category/", "")
            });
        });
    }

    for (let link of arr.slice(0,1)) {
        const { data } = await axios(link.link);
        const $ = cheerio.load(data);
        link.episodeCount = parseInt($("#episode_page > li > a").attr("ep_end"));
        console.log(data)
        link.animeImage = $();
        link.Category
        link.episodeLink = {};
        for (let i = 1; i <= link.episodeCount; i++) {
            const { data } = await axios(
                `https://www9.gogoanime.io/${link.linkHref}-episode-${i}`
            );

            const $ = cheerio.load(data);

            link.episodeLink[i] = {};
            $("div.anime_muti_link > ul > li").each(function () {
                link.episodeLink[i][$(this).attr("class")] = $(this)
                    .find("a")
                    .attr("data-video");
            });
            // link.episodeLinkXstream[i] = $(
            //   `div.anime_muti_link > ul > li.xstreamcdn > a
            // ).attr("data-video");
        }
    }
  const json = JSON.stringify(arr)
  fs.writeFileSync(`database.json`,arr)
};
GetPages().then(data => {
    console.log(data);
});

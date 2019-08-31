const axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs')

const scraper =async () =>{
 const html = `https://www9.gogoanime.io`
 const html1 = `https://www9.gogoanime.io/?page=2`
 const data = await getOngoing(html);
 console.log(data)
 let lista = await getFrontpage(html,data);
 lista = [...lista,...await getFrontpage(html1,data)]
 lista.slice(0,30);
 writeFile(lista)

}
// Put the page and the variable you want to store the data in.
const getOngoing = async (html) =>{
    const links = []
    //Get data
    const {data} = await axios(html);
    //Load it into cheerio
    $ = cheerio.load(data);
    //Get Ongoing animes list
    $(`#scrollbar2 > div.viewport > div > nav > ul > li > a`).each((idx,el)=>{
        links.push(
            $(el).text()
        )
    })
    return links;
}
const getFrontpage = async (html,links) =>{
    const homepage = [];
    const {data} = await axios(html);

    $ = cheerio.load(data);
    
    $(`#load_recent_release > div.last_episodes.loaddub > ul > li`).each((idx,el)=>{
       const title = $(el).find(`p.name`).find(`a`).text();
       if (links.indexOf(title) != -1){
           homepage.push({
               title:title,
               episode: parseInt($(el).find(`p.episode`).text().match(/[0-9]+/g)),
               image:$(el).find(`div`).find(`a`).find(`img`).attr(`src`)
           })
       }
    })
    return homepage;
}
const writeFile = async (lista) =>{
    json = JSON.stringify(lista)
    fs.writeFileSync(`frontpage.json`,json)
}
scraper();
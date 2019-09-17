const axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs')

const scraper =async () =>{
 const html = `https://www9.gogoanime.io`
 const html1 = `https://www9.gogoanime.io/?page=2`
 const html2 = `https://www9.gogoanime.io/?page=3`
 const html3 = "https://www9.gogoanime.io/?page=4"
 const data = await getOngoing(html);
 console.log(data)
 let lista = await getFrontpage(html,data);
 lista = [...lista,...await getFrontpage(html1,data)]
 lista = [...lista,...await getFrontpage(html2,data)]
 lista = [...lista,...await getFrontpage(html3,data)]
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
const getOngoingObject = async (html) =>{
    const links = []
    //Get data
    const {data} = await axios(html);
    //Load it into cheerio
    $ = cheerio.load(data);
    //Get Ongoing animes list
    $(`#scrollbar2 > div.viewport > div > nav > ul > li > a`).each((idx,el)=>{
        links.push(
            {
                title:$(el).text(),
                anime:html+$(el).attr('href')
            }
        )
    })
    for(let arr of links){
        // console.log(arr);
        const {data} = await axios(arr.anime)
        $ = cheerio.load(data);
        $(`.anime_info_body_bg > img`).each((idx,el)=>{
            arr.img = $(el).attr('src')
        })

    }
    return links;
}
// scraper();

const ongoing = async (html) =>{
    
    const data1 = await getOngoingObject(html)
 json1 = JSON.stringify(data1)
 fs.writeFileSync(`ongoing.json`,json1)
}
// ongoing();



const GetPopular = async () => {
   const popular = [];
  const animeshow = `http://www.animeshow.tv/`;
  const {data} = await axios(animeshow);
  $ = cheerio.load(data)
  $(`#p_a > div > div > div > a > div > div`).each((idx,el)=>{
        popular.push(
            { 
             title:$(el).text(),
             slug:$(el).text().replace(':','').replace("'","").toLowerCase().match(/(\w+)/g).join('-')
            }
        )
  })
  for( let arr of popular){
      const {data} = await axios(`https://www9.gogoanime.io/category/${arr.slug}`)
      $ = cheerio.load(data)
      const img = $(`#wrapper_bg > section > section.content_left > div.main_body > div:nth-child(2) > div.anime_info_body_bg > img`)
      const plot = $(`#wrapper_bg > section > section.content_left > div.main_body > div:nth-child(2) > div.anime_info_body_bg > p:nth-child(5)`)
      const genre = $(`#wrapper_bg > section > section.content_left > div.main_body > div:nth-child(2) > div.anime_info_body_bg > p:nth-child(6)`)
       arr.img = img.attr(`src`);
       arr.plot = plot.text().replace(`Plot Summary: `,"");
       arr.genre = genre.text().replace(`Genre: `,"").match(/(\w+)/g).join(', ')
       rating = async () =>{
        const {data} = await axios(`https://myanimelist.net/anime.php?q=${arr.title}`)
        $ = cheerio.load(data)
        const rating = $(`tr:nth-child(2) > td:nth-child(5)`)
        return rating.text().match(/[0-9].[0-9]+/g).toString();

       }
       arr.rating = await rating();
  }
     json2 = JSON.stringify(popular);
     fs.writeFileSync(`popular.json`,json2)
}
GetPopular();
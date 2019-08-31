const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
// #latest_anime > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span
// const data = [];
// const scraper = async () => {
//   const response = await axios.get(url);

//   let getData = async html => {
//     const $ = cheerio.load(html);
//     for (let i = 0; i < 14; i++) {
//       $(`#latest_anime > div > div:nth-child(${i}) `).each((idx, elem) => {
//         data.push({

//           index: i,
//           title: $(elem).find("div").find("a").text(),
//           titleJp: 
//           Episode: $(elem).find("div").find("div").find("span").text()
//         });
//       });
//     }
//      console.log(data);
//     const json = JSON.stringify(data);
//     fs.writeFileSync("homepage.json", json);
//   };

//   return getData(response.data);
// };
// scraper();
const name = [];
const scraper = async () => {
  try{  
      const html = `https://9anime.to/home`;
      const response = await axios.get(html, { validateStatus: false });
      // console.log(response.data);
      $ =  cheerio.load(response.data)
      const japaneseTitle = $("#main > div > div.widget.hotnew.has-page > div.widget-body > div:nth-child(2) > div > div > div > div");
            japaneseTitle.each( (idx,el) =>{
                      name.push({
                        title:$(el).find(`a.name`).attr('data-jtitle'),
                        Episode:$(el).find(`div.ep`).text().replace('Ep',``).trim().replace('/',` `).split(' ')[0],
                        OutofEpisode:$(el).find(`div.ep`).text().replace('Ep',``).trim().replace('/',` `).split(' ')[1],
                        slug: $(el).find(`a.name`).attr('data-jtitle').replace(':','').replace("'","").toLowerCase().match(/(\w+)/g).join('-')
                      })
            })
            for(links of name)
            {if(links.slug==`yichang-shengwu-jianwenlu-specials`)
             var index = name.indexOf(links);
          }
          
            // name.splice(index,1)
           for(links of name){
        if(links.slug=='mix')
        links.slug=`mix-meisei-story`
        if(links.slug==`star-twinkle-precure`)
        links.slug = `startwinkle-precure`;
      }
            for(anime of name){
              try{
              let data = await  axios(`https://www9.gogoanime.io/category/${anime.slug}`) 
                        
              $ = cheerio.load(data.data);
              const imglink =$(`#wrapper_bg > section > section.content_left > div.main_body > div:nth-child(2) > div.anime_info_body_bg > img`).attr(`src`)
              anime.image = imglink
           
            console.log(anime.image);
              }catch(err){

              }
    
            }
  }catch(error){
console.log(error);
  }
  json = JSON.stringify(name);
  fs.writeFileSync(`9anime.json`,json);
};
scraper();
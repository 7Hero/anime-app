const axios = require('axios');
const fs = require('fs')

const thread = 100;

(async () => {
  console.time('ms')

  const cnt = await getPageCnt()
  const pages = Math.ceil(cnt / (20 * thread))
  console.log(pages)
  // const pages = 2
  let animes = [];
  for (let i = 0; i < pages; i++) {
    console.log(i)
    const anime = await getMoreData(i)
    let arr = []
    for (let j of anime) arr = [...arr, ...j]
    animes = [...animes, ...arr]
  }
  console.log(animes)
  const json = JSON.stringify(animes)
  fs.writeFileSync('anime.json', json)

  console.timeEnd('ms')
})()



async function getMoreData(pages) {
  const p = 20
  return await Promise.all(
    [...new Array(thread)].map((_, idx) => axios(`https://kitsu.io/api/edge/anime?page[limit]=${p}&page[offset]=${pages * p * thread + idx * p}`).then(({ data }) => data.data))
  )
}


async function getPageCnt() {
  const { data } = await axios('https://kitsu.io/api/edge/anime')
  const cnt = data.meta.count
  return cnt
}
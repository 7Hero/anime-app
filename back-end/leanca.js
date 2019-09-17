const fs = require('fs');
var vasea = [];
var leanca = [];
console.log(vasea)
const openfile = fs.readFileSync(`spotofy.txt`,"utf8");
var  file = openfile.split(`\n`);
console.log(file)
file.map( el =>{
    let ar = el.toString()
    vasea.push(ar.match(/.+Spotify Premium/g))
})
var filtered = vasea.filter(function (el) {
    return el != null;
  });
  var filtered1 = filtered.filter(function (el) {
      const lool = String(el).match(/.+:\w+/g)
      leanca.push(lool);
    return String(el).match(/.+:\w+/g);
  });
  console.log(filtered1)

const output = leanca.join(`\n`)

fs.writeFileSync(`leancaoutput.txt`,output)
console.log(vasea)

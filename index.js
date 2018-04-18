const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  // psst, the promise should be around here...
  sleep.sleep(2);
  return new Promise((resolve, reject)=>{
    fs.readFile(fileName, 'utf-8', (err, data)=>{
      if(!err){
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then (parentsFile =>{
    let parents = JSON.parse(parentsFile)
    readFilePromise(childrenFileName)
    .then (childrensFile =>{
      let childrens = JSON.parse(childrensFile)
    
        for(let i = 0; i < parents.length; i++){
          arrChildrens = []
          for(let j = 0; j < childrens.length; j++){
            if(parents[i].last_name == childrens[j].family){
              arrChildrens.push(childrens[j].full_name)
            }
          }
          parents[i].childrens = arrChildrens
        }
        console.log(parents);
    })
    .catch (errorChildrensFile =>{
      console.log(errorChildrensFile);
    })
  })
  .catch (errorParentsFile =>{
    console.log(errorParentsFile);
  })
}

console.log("Notification : Data sedang diproses !");
matchParentsWithChildrens('./parents.json', './childrens.json');

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
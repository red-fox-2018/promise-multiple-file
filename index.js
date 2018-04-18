const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  // psst, the promise should be around here...
  return new Promise((res, rej) => {
    fs.readFile(fileName, 'utf-8', (err, resultData) => {
      if(err) {
        rej(err)
      } else {
        res(resultData)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then((parentFile) => {
    return readFilePromise(childrenFileName)
    .then((childrenFile) => {
      var pFile = JSON.parse(parentFile)
      var cFile = JSON.parse(childrenFile)
      for(let i in pFile) {
        pFile[i]["children"] = []
        for(let j in cFile) {
          if(cFile[j].family == pFile[i].last_name) {
            pFile[i].children.push(cFile[j].full_name)
          }
        }
      }
      console.log(pFile)
    })
  })
  .catch((err) => {
    console.log('data not found')
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');

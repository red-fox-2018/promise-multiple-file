const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise(function(resolve, reject){
    fs.readFile(file,'utf-8',(err,data) => {
      if(err){
        reject(err)
      }else {
        let dataJSON = JSON.parse(data)
        resolve(dataJSON)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(parentFile => {
    sleep.sleep(5)
    readFilePromise(childrenFileName)
    .then(childrenFile => {
      for (let i = 0; i < parentFile.length; i++) {
        
        parentFile[i].children = []
        for (let j = 0; j < childrenFile.length; j++) {
          
          if(parentFile[i].last_name == childrenFile[j].family) {
            parentFile[i].children.push(childrenFile[j].full_name)
          }
        }
      }

      console.log(parentFile);
    })
    .catch(errChildren => {
      console.log(`Terjadi error pada proses pembacaan data`);
      console.log(errChildren);
    })
  })
  .catch(errParent => {
    console.log(`Terjadi error pada proses pembacaan data`);
    console.log(errParent);
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
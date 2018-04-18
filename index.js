const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  // psst, the promise should be around here...
  return new Promise(function(res, rej){
    fs.readFile(fileName, 'utf8', function(err, data){
      sleep.sleep(1)
      let dataParse = JSON.parse(data)
      if(err){
        rej(err)
      }else{
        res(dataParse)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(function(parentFile){
    return readFilePromise(childrenFileName)
    .then(function(childrenFile){
      return {parentFile, childrenFile}
    })
  })
  .then(function(arrData){
    arrData.parentFile.forEach(function (objParent){
      let filterChildren = arrData.childrenFile.filter((objChildren) => {
        return objChildren.family.indexOf(objParent.last_name) !== -1
      })
      let arrChildren = filterChildren.map(obj => Object.entries(obj)[1][1])
      objParent.children = arrChildren
    })
    console.log(arrData.parentFile);
  })
  .catch(function(err){
    console.log('Terjadi error pada proses pembacaan data');
    console.log(err);
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');

const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(source) {
  let promise = new Promise((resolve,reject)=>{
      fs.readFile(source,function (err,read_data) {
        if(err){
          reject('Terjadi error pada proses pembacaan data')
        }
        else{
          let data = JSON.parse(read_data)
          resolve(data)
        }
      })
  })
  return promise
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName).then(parents => {
    parents.forEach(value=>{
      value.childrens = []
    })
    return parents
  })
  .then( (parents) => {
     return readFilePromise(childrenFileName)
     .then((childrens) => {
      parents.forEach(parent=>{
        childrens.forEach(value => {
          if(parent.last_name == value.family){
             parent.childrens.push(value.full_name)
          }
        })
      })
      return parents
    })
  })
  .then((result)=>{
    console.log(result)
    sleep.sleep(2)
  })
  .catch((err)=>{
    console.log(err)
    sleep.sleep(2)
  })  
}



matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
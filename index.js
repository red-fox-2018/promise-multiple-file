const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve,reject)=>{
    fs.readFile(file,'utf8',(err,data)=>{
      if(err){
        reject(err)
      }
      else{
        resolve(JSON.parse(data))
      }
    })
  })

}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(dataOrangTua => {
    sleep.sleep(5);  
    // console.log(dataOrangTua)
    readFilePromise(childrenFileName)
    .then(dataAnak => {
      // console.log(dataAnak)
      // console.log(dataOrangTua)
      dataOrangTua.forEach(orangTua => {
        orangTua.childrens = []
        dataAnak.forEach(anak => {
          // console.log(anak)
          if(orangTua.last_name == anak.family){
            orangTua.childrens.push(anak.full_name)
          }
        })
      })
      console.log(dataOrangTua)
    })
    .catch(error => {
      console.log('Terjadi error pada proses pembacaan data.',error)
    })

  })
  .catch(error =>{
    console.log('Terjadi error pada proses pembacaan data.',error)
  })
}


matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
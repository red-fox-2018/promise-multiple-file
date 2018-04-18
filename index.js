const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(filename) {
  // psst, the promise should be around here...
  return new Promise ((resolve,reject)=>{
    fs.readFile(filename,"UTF8",((err,data)=>{
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    }))
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(parentsList=>{
    return readFilePromise(childrenFileName)
    .then(childrensList=>{
      var joinObj = {parent : JSON.parse(parentsList),children : JSON.parse(childrensList)}
      return joinObj
    })
  })
  .then(joinedObj=>{
    let parent = joinedObj.parent
    let children = joinedObj.children
    parent.forEach(dataparent =>{
      dataparent.childrens = []
      children.forEach(dataChildren=>{
        if(dataparent.last_name === dataChildren.family){
          dataparent.childrens.push(dataChildren.full_name)
        }
      })
    })
    console.log(parent)
  })
  .catch(err=>{
    console.log('Terjadi error pada proses pembacaan data',err)
  })

}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');

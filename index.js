const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(input) {
  let promise=new Promise((resolve,reject)=>{
    fs.readFile(input,'utf8',function(err,data){
        if(err) console.log(err)
        else if(input==undefined) reject(err)
        resolve(JSON.parse(data))
    })
})
  return promise
}


function matchParentsWithChildrens(parentFileName, childrenFileName) {
  var readParent= readFilePromise(parentFileName)
  var readChildren=readFilePromise(childrenFileName)
  Promise.all([readParent,readChildren])
  .then(result => {
    var parent = result[0]
    var children=result[1]

   for(var i=0; i<parent.length; i++){
     parent[i]["children"]=[]
     for(var j=0; j<children.length; j++){
      if(children[j].family==parent[i].last_name){
        parent[i].children.push(children[j].full_name)
      }
     }
   }
   
   return parent
  })
  .then((parent)=>{
    console.log(parent)
  })
  .catch(reject=>{
    console.log(reject)
  })
 

}

// matchParentsWithChildrens('./parents.json', './childrens.json');
// console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
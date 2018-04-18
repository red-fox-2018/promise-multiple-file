const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  //let dataFiles = require('parents')
  return new Promise((resolve,reject)=>{
  	fs.readFile(file,'utf8',function(err,data){
  		if (err) {
  			reject('error')
  		}
  		else{
  			resolve(JSON.parse(data))
  		}
  	})
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  var arrData = []
  readFilePromise(parentFileName).then (parents => {
    readFilePromise(childrenFileName).then (childrens => {
      // console.log(arrObjChildren);

      for(var i=0;i<parents.length;i++){
  			parents[i].childrens = []
  			for(var j=0;j<childrens.length;j++){
  				if (childrens[j].family === parents[i].last_name) {
  					parents[i].childrens.push(childrens[j].full_name)
  				}
  			}
  		}
  		console.log(parents)
    }).catch(error => {
      console.log(error);
    })  
    // console.log(arrObjParent);
  }).catch(error => {
    console.log(error);
  })
}
//console.log(readFilePromise('./parents.json'))
//matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
//matchParentsWithChildrens('./parents.json', './childrens.json');
matchParentsWithChildrens('./parents.json', './childrens.json');
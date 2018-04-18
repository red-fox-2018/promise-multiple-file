const fs = require('fs');
const sleep = require('sleep');

function readFilePromise(path) {
  // psst, the promise should be around here...
  return new Promise(function(resolve, reject) {
    fs.readFile(path, (err, data) => {
      if(!err) {
        resolve(JSON.parse(data));
      } else {
        reject(err);
      }
    });
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(function(dataParents) {
    sleep.sleep(1);
    console.log("Data parent selesai di proses");
    return readFilePromise(childrenFileName)
    .then(function(dataChildrens) {
      sleep.sleep(1)
      console.log("Data children selesai di proses");
      return [dataParents,dataChildrens]
    })
  })
    .then(function(dataPC){
      var parent = dataPC[0]
      let children= dataPC[1]
        for(let i=0; i< parent.length ;i++) {

            parent[i].children = []
           for(let j=0; j<children.length;j++) {
             //console.log(children[j].family,'child');
            if(parent[i].last_name == children[j].family) {
              parent[i].children.push(children[j].full_name);
            }
          }
        }
        console.log(parent);
      })

  .catch(function(err){
    console.log('maaf ngodingngnya ngaco');
  })


}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');

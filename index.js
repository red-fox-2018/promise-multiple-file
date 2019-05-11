const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(pathFile) {
  // psst, the promise should be around here...
  sleep.sleep(5)
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, 'utf-8', (err, data) => {
      if (!err) {
        let dataJson = JSON.parse(data);
        resolve(dataJson);
      } else {
        reject(err);
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
    .then(dataParent => {
      return readFilePromise(childrenFileName)
        .then(dataChild => {
          return {
            parents: dataParent,
            childrens: dataChild
          }
        })
    })
    .then(data => {
      data.parents.forEach(parent => {
        let childrensName = [];
        data.childrens.forEach(child => {
          if (parent.last_name === child.family) {
            childrensName.push(child.full_name);
          }
        })
        parent.childrens = childrensName;
      })

      console.log(data.parents);
    })
    .catch(err => {
      console.log(err);
    })

}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
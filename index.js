const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  let promise = new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, dataStr) => {
      if (err) {
        reject('Terjadi error pada proses pembacaan file');
      } else {
        let dataObj = JSON.parse(dataStr);
        resolve(dataObj)
      }
    })
  })
  return promise;
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {

  sleep.sleep(5)
  readFilePromise(parentFileName)
  .then((parents) => {
    return readFilePromise(childrenFileName)
    .then((children) => {
      for (var i = 0; i < parents.length; i++) {
        parents[i].children = []
        for (var j = 0; j < children.length; j++) {
          if (children[j].family === parents[i].last_name) {
            parents[i].children.push(children[j].full_name);
          }
        }
      }
    })
  })

  .catch((message) => {
    console.log(message);
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');

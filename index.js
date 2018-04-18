const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  // psst, the promise should be around here...
  return promise = new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        var arr = JSON.parse(data);
        resolve(arr)
      }
    })
  })

}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
    .then(parents => {
      return readFilePromise(childrenFileName)
        .then(function (childrens) {
          parents.forEach(p => {
            p.childrens = []
            childrens.forEach(c => {
              if (p.last_name == c.family) {
                p.childrens.push(c.full_name);
              }
            })
            sleep.sleep(1)
            console.log(p)
          });
        })
    })
    .catch(err => {
      console.log('ERROR', err)
    });
}



// matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './childrens123.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
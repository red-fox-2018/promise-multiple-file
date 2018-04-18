const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(path) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {

    fs.readFile(path, 'utf8', (err, data) => {

      if (err) {
        reject(err)
      } else {
        resolve(data)
      }

    })

  })

}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)

  readFilePromise(parentFileName)

  .then((data) => {

    let data_parents = JSON.parse(data)

    data_parents.forEach(parent => {
      parent.childrens = []
    })

    return readFilePromise(childrenFileName)

    .then((childrensFile) => {

      childrensFile = JSON.parse(childrensFile)

      return [data_parents, childrensFile]

    })

  })

  .then((alldata) => {

    for (var i = 0; i < alldata[0].length; i++) {

      for (var j = 0; j < alldata[1].length; j++) {

        if (alldata[1][j].family == alldata[0][i].last_name) {
          alldata[0][i].childrens.push(alldata[1][j].full_name)
        }

      }

    }

    return alldata[0]

  })

  .then((all_data_parents) => {
    console.log(all_data_parents);
  })

  .catch((err) => {
    console.log(`data "${childrenFileName}" is not defined !`);
  })

}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');

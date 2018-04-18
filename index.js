const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise(function (resolve, reject){
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(function(dataParent) {
    return readFilePromise(childrenFileName)
    .then(function(dataChildren) {
      return [dataParent, dataChildren];
    })
  })
  .then(function(dataParentChildren) {
    sleep.sleep(5)
    var allDataParent = JSON.parse(dataParentChildren[0]);
    var allDataChildren = JSON.parse(dataParentChildren[1]);
    for (var k = 0; k < allDataParent.length; k++) {
      allDataParent[k].childrens = [];
    }
    for (var i = 0; i < allDataParent.length; i++) {
      dataParentChildren[0][i].childrens = [];
      for (var j = 0; j < allDataChildren.length; j++) {
        if (allDataParent[i].last_name == allDataChildren[j].family) {
          allDataParent[i].childrens.push(allDataChildren[j].full_name)
        }
      }
    }
    return allDataParent;
  })
  .then(function(all_data) {
    console.log(all_data);
  })
  .catch(function(err) {
    console.log('Terjadi error pada proses pembacaan data');
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');

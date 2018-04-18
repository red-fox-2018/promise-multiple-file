const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise((resolve, reject) => {
    // sleep.sleep(1);
    fs.readFile(file, 'utf8', function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(result));
      }
    });
  });
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  Promise.all([readFilePromise(parentFileName), readFilePromise(childrenFileName)])
  .then(values => {
    let finalResult = [];
    let parent = values[0];
    let children = values[1];
    for (let p of parent) {
      finalResult.push(_match(p, children));
    }
    console.log(finalResult);
  }).catch(err => {});
}

function _match(parent, children) {
  let result = [];
  for (let c of children) {
    if (c.family == parent.last_name) {
      result.push(c.full_name);
    }
  }
  let objResult = {
    id: parent.id,
    first_name: parent.last_name,
    last_name: parent.first_name,
    age: parent.age,
    childrens: result,
  }
  return objResult;
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
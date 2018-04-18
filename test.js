const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise ((resolve,reject) => {
    fs.readFile(file,'utf8',function(err,data) {
      if (err) {
        reject ('Terjadi error pada proses pembacaan data.');
      } else {
        resolve(JSON.parse(data));
      }
    })
  })
}
  
function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  var arrData = []
  readFilePromise(parentFileName).then (arrObjParent => {
    readFilePromise(childrenFileName).then (arrObjChildren => {
      // console.log(arrObjChildren);

      for (var i = 0; i < arrObjParent.length; i++) {
        var newObj = {};
        newObj.id = arrObjParent[i].id;
        newObj.first_name = arrObjParent[i].first_name;
        newObj.last_name = arrObjParent[i].last_name;
        newObj.age = arrObjParent[i].age

        var arrChildren = [];
        for (var j = 0; j < arrObjChildren.length; j++) {
          if (arrObjParent[i].last_name == arrObjChildren[j].family) {
            arrChildren.push(arrObjChildren[j].full_name);
          }
        }

        newObj.childrens = arrChildren;
        arrData.push(newObj);
      }
      console.log(arrData);

    }).catch(error => {
      console.log(error);
    })  
    // console.log(arrObjParent);
  }).catch(error => {
    console.log(error);
  })
  
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
// console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
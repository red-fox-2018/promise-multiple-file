/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/
/*jshint -W083*/

const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
   return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (err, data) => {
         if (err) {
            reject(`Error Reading Data, ini Errornya => ${err}`);
         } else {
            resolve(JSON.parse(data));
         }
      });
   });
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
   readFilePromise(parentFileName)
      .then(dataParents => {
         sleep.sleep(5);
         readFilePromise(childrenFileName)
            .then(dataChildrens => {
               for (let i = 0; i < dataParents.length; i++) {
                  dataParents[i].children = [];
                  for (let j = 0; j < dataChildrens.length; j++) {
                     if (dataParents[i].last_name == dataChildrens[j].family) {
                        dataParents[i].children.push(dataChildrens[j].full_name);
                     }
                  }
               }
               console.log(dataParents);
            }).catch(err => console.log(err));
      }).catch(err => console.log(err));
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses, Mohon tunggu !!!");

// for Release 2
console.log('====================');
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');

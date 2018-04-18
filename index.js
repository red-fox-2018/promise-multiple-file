const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(nameFile) {
  let promise = new Promise(function(resolve,reject){
    fs.readFile(nameFile,'utf-8',function(err,read){
      if(err){
        reject("Terjadi error pada proses pembacaan data")
      }else{
        resolve(JSON.parse(read))
      }
    })
  })
  return promise
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {

  // promise all
  let parent = readFilePromise(parentFileName);
  let children = readFilePromise(childrenFileName);

  Promise.all([parent, children])
  .then(function(arr_result) {
    for(let i=0;i<arr_result[0].length;i++){
      arr_result[0][i]["childrens"] = []
      for(let k=0;k<arr_result[1].length;k++){
        if(arr_result[0][i].last_name==arr_result[1][k].family){
            arr_result[0][i]["childrens"].push(arr_result[1][k].full_name)
        }
      }
    }
    return arr_result[0]
  })
  .then(function(result){
    console.log(result)
    sleep.sleep(5)
  })
  .catch(err =>{
    console.log(err)
    sleep.sleep(5)
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
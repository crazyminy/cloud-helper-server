const fs = require("fs");
const path = require("path");
const uuidv1 = require('uuid/v1');
var images = require("images");
const targetPath = "/Users/crazyminy/Desktop/destination";
const simDest = "/Users/crazyminy/Desktop/simDest";
/**
 * 
 * @param {File[]} files 
 */
function saveRaw(files) {
    //console.log(2333,files);
    // files.forEach((file,index)=>{
    //     console.log(path.parse(file.path).ext);
    // })
    files.forEach(file=>{
        //先移动文件到目标文件夹
        let name = uuidv1().replace(/-/g,'')+'.png';
        let path_raw = path.join(targetPath,name);
        let path_comp = path.join(simDest,name);
        fs.renameSync(file.path,path_raw);
        images(name_raw).size(100).save(path_comp,{quality:60});
    })
}

module.exports = {
    saveRaw
}
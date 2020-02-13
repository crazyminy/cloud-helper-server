const fs = require("fs");
const path = require("path");
const uuidv1 = require('uuid/v1');
// const targetPath = "C:\\Users\\13983\\Desktop\\imgsTest";
// const simDest = "C:\\Users\\13983\\Desktop\\imgsTest\\thumbs";
const targetPath = "/root/imgBed";
const simDest = "/root/thumbs";
/**
 * 
 * @param {File[]} files 
 */
function handleFiles(raws,thumbnails,dbHelper) {
    //console.log(2333,files);
    // files.forEach((file,index)=>{
    //     console.log(path.parse(file.path).ext);
    // })

    if(!fs.existsSync(targetPath)){
        fs.mkdirSync(targetPath);
    }
    if(!fs.existsSync(simDest)){
        fs.mkdirSync(simDest);
    }
    for(let i = 0;i<raws.length;i++){
        let name_r = uuidv1().replace(/-/g,'');
        let name_t = uuidv1().replace(/-/g,'');
        let path_raw = path.join(targetPath,name_r);
        let path_thumb = path.join(simDest,name_t);
        fs.renameSync(raws[i].path,path_raw,+'.png');
        fs.renameSync(thumbnails[i].path,path_thumb+'.png');
        dbHelper.pushNewThumb(name_t);
        dbHelper.setThumbRawMap(name_t,name_r);
        
    }
    
}

module.exports = {
    handleFiles
}
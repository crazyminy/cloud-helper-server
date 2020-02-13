const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')



/**
 * 
 * @param {string} jsonLocation 本地数据json文件的路径
 */
module.exports = function DbHelper(jsonLocation){
    const adapter = new FileSync(jsonLocation)
    const db = low(adapter);

    this.init = function(){
    }

    this.getAllthumbs = function(){
        return db.get("thumbnails").value();
    }

    this.setThumbRawMap = function(thumbName,rawName){
        db.get("thumb_raw")
        .set(thumbName,rawName)
        .write();
    }

    this.pushNewThumb = function(thumbName){
        db.get("thumbnails")
        .push(thumbName)
        .write();
    }
}
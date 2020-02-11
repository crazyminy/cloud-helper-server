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
        console.log(db.get("posts").value())
    }
}
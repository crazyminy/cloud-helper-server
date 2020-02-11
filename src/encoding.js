const md5 = require("md5");

module.exports = (str)=>{
    return md5("salt"+md5(str));
}


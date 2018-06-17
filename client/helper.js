const moment = require('moment');
module.exports.timeago = (date) =>{
    return moment(date).fromNow();
}

module.exports.path = (slug) =>{
    let path = slug.split('/');
    return path[path.length - 1];
}
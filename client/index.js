const express = require('express');
const app = express();
const router = require('./router/index');
app.set('view engine', 'ejs')

app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    axios.get(config.api + enumValue.path.namespaces).then((resData) =>{
        let data = resData.data.items;
        let length = data.length;
        let namespaces = [];
       
        for (let i = 0; i < length; i++) {
            const item = data[i];
            namespaces.push({
                name : item.metadata.name,
                link : `${enumValue.pathapp.namespaces}/${helper.path(item.metadata.selfLink)}`,
                labels : item.metadata.labels,
                status : item.status.phase,
                age : helper.timeago(item.metadata.creationTimestamp)
            })
        }
        req.namespace = namespaces;
        next();
    })
    .catch((error) =>{
        callback(error, null);
    })
  
});

app.use(router);

app.listen(8222, () =>{
    console.log('running!!!!! on port 8222');
});

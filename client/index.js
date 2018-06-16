const express = require('express');
const app = express();
const router = require('./router/index');
app.set('view engine', 'ejs')

app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use(router);

app.listen(8222, () =>{
    console.log('running!!!!! on port 8222');
});

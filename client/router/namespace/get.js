const axios = require('axios');
const enumValue = require('./../../common/enum');
const config = require('./../../config.json');
const helper = require('./../../helper');

const footer = `
<script type="text/javascript">
  $('#tableNamespaces').DataTable();
</script>
`

function get(req, res) {
    namespaces((error, data) =>{
        if(error) {
            console.log(error);
        } else {
            res.render('index', {
                page: 'pages/namespace/namespaces',
                data: data,
                footer : footer
            });
        }
    });
}


function namespaces(callback) {
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
        callback(null, namespaces);
    })
    .catch((error) =>{
        callback(error, null);
    })
}

module.exports = get;
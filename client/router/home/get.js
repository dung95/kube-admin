const axios = require('axios');
const enumValue = require('./../../common/enum');
const config = require('./../../config.json');
const helper = require('./../../helper');
function get(req, res) {

    const footer = `
    <script type="text/javascript">
      $('#tableNamespaces').DataTable();
      $('#tableNodes').DataTable();
      $('#tablePersistent').DataTable();
    </script>
    `
    

    namespaces((error1, namespaces) =>{
        if(error1) {
            console.log(error1);
        } else {
            nodes((error2, nodes) =>{
                if(error2) {
                    console.log(error2);
                } else {
                    persistentVolume((error3, persistentVolume) =>{
                        if(error3) {
                            console.log(error3);
                        } else {
                            let dataReturn = {
                                namespaces : namespaces,
                                nodes : nodes,
                                persistentVolume : persistentVolume
                            };
                            res.render('index', {
                                page: 'pages/home',
                                data: dataReturn,
                                footer : footer
                            });
                        }
                    });
                }
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


function nodes(callback) {
    axios.get(config.api + enumValue.path.nodes).then((resData) =>{
        let data = resData.data.items;
        let length = data.length;
        let nodes = [];
       
        for (let i = 0; i < length; i++) {
            const item = data[i];
            nodes.push({
                name : item.metadata.name,
                link : `${enumValue.pathapp.nodes}/${helper.path(item.metadata.selfLink)}`,
                labels : item.metadata.labels,
                ready : item.status.conditions[5].status,
                age : helper.timeago(item.metadata.creationTimestamp)
            })
        }
        callback(null, nodes);
    })
    .catch((error) =>{
        callback(error, null);
    })
}

function persistentVolume(callback) {
    axios.get(config.api + enumValue.path.persistentvolume).then((resData) =>{
        let data = resData.data.items;
        let length = data.length;
        let persistentVolume = [];
       
        for (let i = 0; i < length; i++) {
            const item = data[i];
            persistentVolume.push({
                name : item.metadata.name,
                link : `${enumValue.pathapp.persistentvolume}/${helper.path(item.metadata.selfLink)}`,
                capacity : item.spec.capacity.storage,
                accessModes : item.spec.accessModes, //mang
                reclaimPolicy : item.spec.persistentVolumeReclaimPolicy,
                status : item.status.phase,
                claim : `namespace/${item.spec.claimRef.namespace}/persistentvolumeclaims/${item.spec.claimRef.name}`,
                storageClass : item.spec.storageClassName,
                age : helper.timeago(item.metadata.creationTimestamp)
            })
        }
        callback(null, persistentVolume);
    })
    .catch((error) =>{
        callback(error, null);
    })
}

module.exports = get;
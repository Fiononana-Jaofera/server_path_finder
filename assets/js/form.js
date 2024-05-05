var serverList = [];
var edges = [];
var urlList = [];
var newServerForm = document.getElementById("newServerForm");
var addServerButton = document.getElementById('addServer');
var deleteServerButton = document.getElementById('delete');
var saveButton = document.getElementById('save');


addServerButton.addEventListener('click', function (e) {
    document.getElementById('name').value = '';
    document.getElementById('addURL').value = '';
    document.getElementById('urlList').textContent = '';
    saveButton.style.width = '100%';
    neighboursList.length = 0;
    newServerForm.style.display = (newServerForm.style.display === 'none') ? 'block' : 'none';
    addServerButton.textContent = (newServerForm.style.display === 'none') ? 'Add Server' : 'Cancel';
    addServerButton.style.backgroundColor = (newServerForm.style.display === 'none') ? '#5095ff' : 'red';
    document.getElementById('neighboursOption').style.display = 'none';
    document.getElementById('selectNeighbours').style.display = 'none';
    document.getElementById('neighboursList').style.display = 'none';
    document.getElementById('weight').style.display = 'none';
    document.getElementById("name").readOnly = false;
    document.getElementById('pingURL').style.display = 'none';
    deleteServerButton.style.display = 'none';
});


// Event which handle Add URL button click
document.getElementById("addURLButton").addEventListener("click", e => {
    var url = document.getElementById("addURL").value;
    var name = document.getElementById("name").value;
    if (name.length > 0) {
        var server = serverList.find(s => s.name == name);
        if (server) {
            urlList = server.getUrlList();
        }
    }
    if (url.length > 0 && !urlList.includes(url)) {
        var li = document.createElement('li');
        li.textContent = url;
        document.getElementById('urlList').appendChild(li);
        document.getElementById('addURL').value = '';
        urlList.push(url);
    }
});

// Event handle form submit
newServerForm.addEventListener("submit", e => {
    e.preventDefault();
    var name = document.getElementById("name").value;
    if (name.length > 0 && urlList.length > 0 && !serverList.some(s => s.name == name)) {
        var server = new Server(name, urlList);
        serverList.push(server);
        urlList.length = 0;

        // update the dom
        document.getElementById('name').value = '';
        document.getElementById('urlList').textContent = '';
        newServerForm.style.display = 'none';
        server.display();
    }
    else if (name.length > 0) {

        if (neighboursList.length > 0) { // handle save neighbours
            serverList.forEach(s => {
                // update neighbours of node clicked
                if (s.name == name) {
                    neighboursList.forEach(neighbour => {
                        var sn = serverList.find(n => n.name == neighbour.name);
                        s.setNeighbours({
                            server: sn,
                            weight: neighbour.time,
                        });
                        // create connector
                        var line = new Konva.Line({
                            stroke: 'black',
                            points: [s.getX() + 45 + width/3, s.getY() + height/2 - 10, sn.getX() + 45 + width/3, sn.getY() + height/2 - 10],
                            id: s.name + '-' + sn.name,
                            name: 'connector'
                        });
                        layer.add(line);
                        edges.push(line);
                    });
                }
                // update neighbours nodes
                else if (neighboursList.some(n => n.name == s.name)) {
                    s.setNeighbours({
                        server: serverList.find(x => x.name == name),
                        weight: neighboursList.find(n => n.name == s.name).time,
                    });
                }
            });
        }
        // update the dom
        document.getElementById('name').value = '';
        document.getElementById('urlList').textContent = '';
        newServerForm.style.display = 'none';
        neighboursList.length = 0;
    }
    addServerButton.textContent = (newServerForm.style.display === 'none') ? 'Add Server' : 'Cancel';
    addServerButton.style.backgroundColor = (newServerForm.style.display === 'none') ? '#5095ff' : 'red';
});

// handle select neighbours event
var neighboursList = []
document.getElementById('selectNeighbours').addEventListener("click", e => {
    var neighbour = document.getElementById('neighboursOption').value;
    var name = document.getElementById('name').value;
    var weight = document.getElementById('weight').value;
    var server = serverList.find(s => s.name == name)

    if (neighbour.length > 0 && !neighboursList.some(n => n.name == neighbour) && !server.getNeighbours().some(n => n.server.name == neighbour) && weight.length > 0) {
        var li = document.createElement('li');
        li.textContent = neighbour + ' | Time: ' + weight;
        document.getElementById('neighboursList').appendChild(li);
        document.getElementById('selectNeighbours').value = '';
        document.getElementById('weight').value = '';
        neighboursList.push({name: neighbour, time: Number(weight)});
    }
});

// handle delete server event
deleteServerButton.addEventListener('click', () => {
    var server = serverList.filter(s => s.group._id == groupSelected._id)[0];

    // delete the edge
    if (edges.length > 0) {
        edges.forEach(e => {
            var idParts = e.attrs.id.split('-');
            if (idParts[0]==server.name || idParts[1]==server.name) {
                e.destroy();
                edges = edges.filter(f => f!==e);
            }
        })
    }

    // delete from neighbours of each other server
    serverList.forEach(s => {
        s.removeFromNeighbours(server.name);
        serverList = serverList.filter(f => f!==server);
    });

    // delete the node
    groupSelected.destroy();
    // update the dom
    newServerForm.style.display = 'none';
    addServerButton.textContent = "Add Server";
    addServerButton.style.backgroundColor = "#5095ff";
});

document.getElementById('pingURL').addEventListener('click', () => {
    var url = document.getElementById('url').value;
    if (url.length > 0) {
        var name = document.getElementById('name').value;
        var server_start = serverList.filter(s => s.name == name);
        var serverfound = serverList.filter(s => s.urlList.includes(url));
        if (serverfound.length > 0) {
            dijskra(server_start);
            // var result = generate_road(server_start, serverfound[0]);
            // console.log(result);
        }
    }
})
var serverList = [];
var edges = [];

document.getElementById('addServer').addEventListener('click', function (e) {
    document.getElementById('name').value = '';
    document.getElementById('addURL').value = '';
    document.getElementById('urlList').textContent = '';
    neighboursList.length = 0;
    document.getElementById("newServerForm").style.display = (document.getElementById("newServerForm").style.display === 'none') ? 'block' : 'none';
    document.getElementById('addServer').textContent = (newServerForm.style.display === 'none') ? 'Add Server' : 'Cancel';
    document.getElementById('addServer').style.backgroundColor = (newServerForm.style.display === 'none') ? 'green' : 'red';
    document.getElementById('neighboursOption').style.display = 'none';
    document.getElementById('selectNeighbours').style.display = 'none';
    document.getElementById('neighboursList').style.display = 'none';
    document.getElementById("name").readOnly = false;
});


// Event which handle Add URL button click
var urlList = []
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
document.getElementById("newServerForm").addEventListener("submit", e => {
    e.preventDefault();
    var name = document.getElementById("name").value;
    if (name.length > 0 && urlList.length > 0 && !serverList.some(s => s.name == name)) {
        var server = new Server(name, urlList);
        serverList.push(server);
        urlList.length = 0;

        // update the dom
        document.getElementById('name').value = '';
        document.getElementById('urlList').textContent = '';
        document.getElementById("newServerForm").style.display = 'none';
        document.getElementById('addServer').textContent = 'Add Server';
        document.getElementById('addServer').style.backgroundColor = 'green';
        server.display();
    }
    else if (name.length > 0) {

        if (neighboursList.length > 0) { // handle save neighbours
            serverList.forEach(s => {
                // update neighbours of node clicked
                if (s.name == name) {
                    neighboursList.forEach(neighbour => {
                        var sn = serverList.find(n => n.name == neighbour);
                        s.setNeighbours({
                            from: name,
                            to: neighbour
                        });
                        // create connector
                        var line = new Konva.Line({
                            stroke: 'black',
                            points: [s.getX()+45, s.getY()-10, sn.getX()+45, sn.getY()-10],
                            id: s.name + '-' + sn.name
                        });
                        layer.add(line);
                        edges.push(line);
                    });
                }
                // update neighbours nodes
                else if (neighboursList.includes(s.name)) {
                    s.setNeighbours({
                        from: s.name,
                        to: name
                    });
                }
            });

        }
        // update the dom
        document.getElementById('name').value = '';
        document.getElementById('urlList').textContent = '';
        document.getElementById("newServerForm").style.display = 'none';
        neighboursList.length = 0;
    }
});

var neighboursList = []
document.getElementById('selectNeighbours').addEventListener("click", e => {
    var neighbour = document.getElementById('neighboursOption').value;
    var name = document.getElementById('name').value;
    var server = serverList.find(s => s.name == name)

    if (neighbour.length > 0 && !neighboursList.includes(neighbour) && !server.getNeighbours().some(n => n.to == neighbour)) {
        var li = document.createElement('li');
        li.textContent = neighbour;
        document.getElementById('neighboursList').appendChild(li);
        document.getElementById('selectNeighbours').value = '';
        neighboursList.push(neighbour);
    }
});
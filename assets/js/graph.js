var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

var layer = new Konva.Layer();
stage.add(layer);

layer.on('click', function (e) {
    // get the element that was clicked on
    var element = e.target;
    var server = serverList.filter(s => s.group._id == element.parent._id)[0]

    document.getElementById('urlList').textContent = '';
    document.getElementById('neighboursOption').textContent = '';
    document.getElementById('addURL').value = '';
    document.getElementById('neighboursList').textContent = '';
    document.getElementById("newServerForm").style.display = 'block';
    document.getElementById("name").value = server.name;
    document.getElementById('neighboursOption').style.display = 'block';
    document.getElementById('selectNeighbours').style.display = 'block';
    document.getElementById('neighboursList').style.display = 'block';
    document.getElementById("name").readOnly = true;
    addServerButton.textContent = (newServerForm.style.display === 'none') ? 'Add Server' : 'Cancel';
    addServerButton.style.backgroundColor = (newServerForm.style.display === 'none') ? 'green' : 'red';
    deleteServerButton.style.display = 'block';

    server.urlList.forEach(url => {
        var li = document.createElement('li');
        li.textContent = url;
        document.getElementById('urlList').appendChild(li);
    });

    serverList.forEach(s => {
        var option = document.createElement('option');
        option.textContent = s.name;
        if (s.name != server.name) {
            document.getElementById('neighboursOption').appendChild(option);
        }
    });

    server.neighbours.forEach(n => {
        var li = document.createElement('li');
        li.textContent = n.to;
        document.getElementById('neighboursList').appendChild(li);
    })
});

function updateConnector(s) {
    var q = s;
    edges.forEach(e => {
        var idParts = e.attrs.id.split('-');
        var moved = q.name;
        if (idParts[0] == moved || idParts[1] == moved) {
            var s = serverList.find(t => t.name == idParts[0]);
            var sn = serverList.find(t => t.name == idParts[1]);
            e.points([s.getX()+45, s.getY()-10, sn.getX()+45, sn.getY()-10]);
        }
    });
}
var width = window.innerWidth - 40;
var height = window.innerHeight - 40;
var groupSelected;

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
    var neighbours = [];
    if (element.attrs.name !== 'connector') {
        var server = serverList.filter(s => s.group._id == element.parent._id)[0];
        groupSelected = element.parent;

        document.getElementById('urlList').textContent = '';
        document.getElementById('neighboursOption').textContent = '';
        document.getElementById('addURL').value = '';
        // document.getElementById('weight').value = '';
        document.getElementById('neighboursList').textContent = '';
        document.getElementById("newServerForm").style.display = 'block';
        document.getElementById("name").value = server.name;
        document.getElementById('neighboursOption').textContent = '';
        document.getElementById('neighboursOption').style.display = 'inline';
        document.getElementById('selectNeighbours').style.display = 'block';
        document.getElementById('neighboursList').style.display = 'block';
        // document.getElementById('weight').style.display = 'inline';
        document.getElementById('pingURL').style.display = 'flex';
        document.getElementById('ping').disabled = true;

        saveButton.style.width = '49%';
        saveButton.style.display = 'inline';
        deleteServerButton.style.display = 'inline';

        document.getElementById("name").readOnly = true;

        addServerButton.textContent = (newServerForm.style.display === 'none') ? 'Add Server' : 'Cancel';
        addServerButton.style.backgroundColor = (newServerForm.style.display === 'none') ? '#5095ff' : 'red';

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

        server.getNeighbours().forEach(n => {
            var li = document.createElement('li');
            neighbours.push(n.server.name);
            li.textContent = n.server.name + ' | Time: ' + n.weight;
            document.getElementById('neighboursList').appendChild(li);
        })
        if (neighbours.length > 0) {
            document.getElementById('ping').disabled = false;
        }
    }
    else {
        console.log("this is an connector")
        console.log(element);
    }
});

function updateConnector(s) {
    var q = s;
    edges.forEach(e => {
        var idParts = e.attrs.id.split('-');
        if (idParts[0] == q.name || idParts[1] == q.name) {
            var s = serverList.find(t => t.name == idParts[0]);
            var sn = serverList.find(t => t.name == idParts[1]);
            e.points([s.getX() + 45 + width/3, s.getY() + height/2 - 10, sn.getX() + 45 + width/3, sn.getY() + height/2 - 10]);
        }
    });
}
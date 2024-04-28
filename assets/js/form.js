var serverList = [];

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('name').value = '';
        document.getElementById('addURL').value = '';
        document.getElementById('urlList').textContent = '';
        neighboursList.length = 0;
        var newServerForm = document.getElementById("newServerForm");
        newServerForm.style.display = (newServerForm.style.display !== 'none') ? 'none' : 'block';
        document.getElementById('neighboursOption').style.display = 'none';
        document.getElementById('selectNeighbours').style.display = 'none';
        document.getElementById('neighboursList').style.display = 'none';
        document.getElementById("name").readOnly = false;
    }
});

var urlList = []
document.getElementById("addURLButton").addEventListener("click", e => {
    var url = document.getElementById("addURL").value;
    if (url.length > 0) {
        var li = document.createElement('li');
        li.textContent = url;
        document.getElementById('urlList').appendChild(li);
        document.getElementById('addURL').value = '';
    }
    urlList.push(url);
});

document.getElementById("newServerForm").addEventListener("submit", e => {
    e.preventDefault();
    var name = document.getElementById("name").value;
    if (name.length > 0 && urlList.length > 0) {
        var server = new Server(name, urlList);
        serverList.push(server);
        urlList.length = 0;

        // update the dom
        document.getElementById('name').value = '';
        document.getElementById('urlList').textContent = '';
        document.getElementById("newServerForm").style.display = 'none';
        server.display();
    }
    else if (name.length > 0 && neighboursList.length > 0) {
        serverList.forEach(s => {

            if (s.name == name) {
                neighboursList.forEach(neighbour => {
                    s.setNeighbours({
                        from: s.name,
                        to: neighbour
                    });
                });
            };
        });
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
    if (neighbour.length > 0) {
        var li = document.createElement('li');
        li.textContent = neighbour;
        document.getElementById('neighboursList').appendChild(li);
        document.getElementById('selectNeighbours').value = '';
    }
    neighboursList.push(neighbour);
});
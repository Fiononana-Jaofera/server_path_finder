var serverList = [];
var edges = [];
var urlList = [];
var newServerForm = document.getElementById("newServerForm");
var addServerButton = document.getElementById('addServer');
// var deleteServerButton = document.getElementById('delete');
var createLinkButton = document.getElementById('createLink');
var saveButton = document.getElementById('save');


addServerButton.addEventListener('click', function (e) {
    document.getElementById('name').value = '';
    document.getElementById('addURL').value = '';
    document.getElementById('urlList').textContent = '';
    saveButton.style.width = '100%';
    newServerForm.style.display = 'block';
    document.getElementById('neighboursList').style.display = 'none';
    document.getElementById("name").readOnly = false;
    // deleteServerButton.style.display = 'none';
});


// Event which handle Add URL button click
document.getElementById("addURLButton").addEventListener("click", e => {
    var url = document.getElementById("addURL").value;
    if (serverSelected) {
        urlList = serverSelected.getUrlList();
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

        //handle create link button
        if (serverList.length >= 2) {
            createLinkButton.style.display = 'block';
        }
    }
    // handle create link between server
    else {
        var between = document.getElementById('betweenoption').value;
        var and = document.getElementById('andoption').value;
        var weight = document.getElementById('time').value;
        if (between !== and && weight.length > 0) {
            var sb = serverList.find(n => n.name == between);
            var sa = serverList.find(n => n.name == and);
            if (sa.getNeighbours().some(s => s.server = sb)) {
                alert('servers already connected');
                return;
            }
            sb.setNeighbours({
                server: sa,
                weight: Number(weight),
            });

            sa.setNeighbours({
                server: sb,
                weight: Number(weight),
            })

            // create connector
            var line = new Konva.Line({
                stroke: 'black',
                points: [sb.getX() + 45 + width / 3, sb.getY() + height / 2 - 10, sa.getX() + 45 + width / 3, sa.getY() + height / 2 - 10],
                id: sb.name + '-' + sa.name,
                name: 'connector'
            });
            layer.add(line);
            edges.push(line);

            newServerForm.style.display = 'none';
        }
    }
});


// handle navigate url event
document.getElementById('navigate').addEventListener('click', () => {
    var text = stage.find('#result')[0];
    if (text != undefined) text.destroy();
    
    var url = document.getElementById('url').value;
    if (url.length > 0) {
        // var name = document.getElementById('name').value;
        // var server_start = serverList.filter(s => s.name == name)[0];
        var server_start = serverSelected;
        var serverfound = serverList.filter(s => s.urlList.includes(url));
        if (serverfound.length > 0) {
            dijkstra(server_start);

            // find the server end which have the smallest weight
            var server_end = serverfound.reduce((prev, curr) => {
                return (prev.weight < curr.weight) ? prev : curr;
            }, serverfound[0]);

            // generate the road
            var result = generate_road(server_start, server_end);

            // update the dom
            if (result.length > 0) {
                for (var i = 0; i < result.length - 1; i++) {
                    var j = i + 1;
                    var from = result[i];
                    var to = result[j];
                    var line = edges.find(e => e.attrs.id == from + '-' + to || e.attrs.id == to + '-' + from);
                    line.stroke('green');
                    layer.batchDraw();
                }

                var text_result = new Konva.Text({
                    id: 'result',
                    x: width / 2,
                    y: height - 40,
                    text: `ping from ${result[0]} to ${url} take ${server_end.weight}ms.`,
                    fontSize: 20,
                    fontFamily: 'Calibri',
                    fill: 'black',
                    fontStyle: 'bold',
                });
                layer.add(text_result);
            }
            else {
                var text_result = new Konva.Text({
                    id: 'result',
                    x: width / 2,
                    y: height - 40,
                    text: `no path found to ping ${url} from ${server_start.name}`,
                    fontSize: 20,
                    fontFamily: 'Calibri',
                    fill: 'black',
                    fontStyle: 'bold',
                });
                layer.add(text_result);
            }
        }
        else {
            var text_result = new Konva.Text({
                id: 'result',
                x: width / 2,
                y: height - 40,
                text: `server which contain ${url} url doesn't exist`,
                fontSize: 20,
                fontFamily: 'Calibri',
                fill: 'black',
                fontStyle: 'bold',
            });
            layer.add(text_result);
        }
        newServerForm.style.display = 'none';
        document.getElementById('reset').style.display = 'block';
    }
});

// handle reset event
document.getElementById('reset').addEventListener('click', () => {
    document.getElementById('reset').style.display = 'none';

    edges.forEach(e => {
        e.stroke('black');
    })

    var text = stage.find('#result')[0];
    if (text != undefined) text.destroy();
})

// handle export pdf event
document.getElementById('export').addEventListener('click', () => {

    document.getElementById('reset').style.display = 'none';
    document.getElementById('export').style.display = 'none';

    var pdf = new jsPDF('l', 'px', [stage.width(), stage.height()]);
    pdf.setTextColor('#000000');

    var dataURL = stage.toDataURL({ pixelRatio: 2 });

    // Add image to PDF
    pdf.addImage(dataURL, 'PNG', 0, 0, width * 0.60, height * 0.75);
    pdf.save('KonvaStage.pdf');
    document.getElementById('reset').click();
})

// handle create Link event
createLinkButton.addEventListener('click', () => {
    newServerForm.style.display = 'block';
    document.getElementById('title').textContent = 'Create link';
    document.getElementById('createServer').style.display = 'none';
    document.getElementById('createLinkLabels').style.display = 'block';
    serverList.forEach(s => {
        var option_between = document.createElement('option');
        var option_and = document.createElement('option');
        option_between.textContent = s.name;
        option_and.textContent = s.name;
        document.getElementById('betweenoption').appendChild(option_between);
        document.getElementById('andoption').appendChild(option_and);
    });
    document.getElementById("name").textContent = '';
})

document.getElementById('cancel').addEventListener('click', () => {
    newServerForm.style.display = 'none';
    menu.style.display = 'flex';
})
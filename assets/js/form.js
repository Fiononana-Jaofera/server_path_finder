var serverList = [];
var edges = [];
var urlList = [];
var newServerForm = document.getElementById("newServerForm");
var addServerButton = document.getElementById('addServer');
var createLinkButton = document.getElementById('createLink');
var saveButton = document.getElementById('save');

// handle add server event
addServerButton.addEventListener('click', function (e) {
    urlList.length = 0;
    document.getElementById('name').value = '';
    document.getElementById('addURL').value = '';
    document.getElementById('urlList').textContent = '';
    saveButton.style.display = 'block';
    saveButton.style.width = '100%';
    newServerForm.style.display = 'flex';
    document.getElementById('createServer').style.display = 'block';
    document.getElementById('createLinkLabels').style.display = 'none';
    document.getElementById("name").readOnly = false;

    document.getElementById('title').textContent = 'New Server';
    menu.style.display = 'none';
    serverSelected = undefined;
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
    else {
        alert('url already exist');
        console.log(urlList);
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
            if (sa.getNeighbours().some(s => s.server == sb)) {
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

            //coordinates
            var sbx = sb.getX() + 45 + width / 3;
            var sby = sb.getY() + height / 2 - 10;
            var sax = sa.getX() + 45 + width / 3;
            var say = sa.getY() + height / 2 - 10
            // create connector
            var line = new Konva.Line({
                stroke: 'black',
                points: [sbx, sby, sax, say],
                id: sb.name + '-' + sa.name,
                name: 'connector'
            });
            layer.add(line);
            edges.push(line);

            // display weight
            var label = new Konva.Text({
                id: sb.name + '-' + sa.name + '-weight',
                x: (sbx + sax) / 2,
                y: (sby + say) / 2,
                text: weight,
                fontSize: 20,
                fontFamily: 'Calibri',
                fill: 'black',
                fontStyle: 'bold',
            });
            layer.add(label);

            newServerForm.style.display = 'none';
        }
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
});

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
});

// handle create Link event
createLinkButton.addEventListener('click', () => {
    newServerForm.style.display = 'flex';
    document.getElementById('title').textContent = 'Create link';
    document.getElementById('createServer').style.display = 'none';
    document.getElementById('createLinkLabels').style.display = 'block';
    document.getElementById('betweenoption').textContent = '';
    document.getElementById('andoption').textContent = '';
    serverList.forEach(s => {
        var option_between = document.createElement('option');
        var option_and = document.createElement('option');
        option_between.textContent = s.name;
        option_and.textContent = s.name;
        document.getElementById('betweenoption').appendChild(option_between);
        document.getElementById('andoption').appendChild(option_and);
    });
});

document.getElementById('cancel').addEventListener('click', () => {
    newServerForm.style.display = 'none';
    if (serverSelected) menu.style.display = 'flex';
});
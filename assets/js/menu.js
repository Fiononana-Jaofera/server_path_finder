document.getElementById('browserbutton').addEventListener('click', () => {
    browser.style.display = 'flex';
    document.getElementById('browserTitle').textContent = 'Web Browser';
    menu.style.display = 'none';
    document.getElementById('content').textContent = '';
    document.getElementById('url').value = '';
});

document.getElementById('applicationlistbutton').addEventListener('click', () => {
    newServerForm.style.display = 'flex';
    menu.style.display = 'none';
    document.getElementById('title').textContent = 'URL list';
    document.getElementById('createServer').style.display = 'block';
    document.getElementById("name").style.display = 'none';
    document.getElementById('createLinkLabels').style.display = 'none';
    document.getElementById('save').style.display = 'none';
    document.getElementById('cancel').style.display = 'block';
    document.getElementById('urlList').style.display = 'block';
    document.getElementById('urlList').textContent = '';
    
    serverSelected.applicationList.forEach(a => {
        var li = document.createElement('li');
        li.textContent = a.url;
        document.getElementById('urlList').appendChild(li);
    })
});

document.getElementById('deletebutton').addEventListener('click', () => {
    // delete the edge
    if (edges.length > 0) {
        edges.forEach(e => {
            var idParts = e.attrs.id.split('-');
            if (idParts[0] == serverSelected.name || idParts[1] == serverSelected.name) {
                var label_element = layer.findOne('#' + e.attrs.id + '-weight');
                label_element.destroy();

                e.destroy();
                edges = edges.filter(f => f !== e);
            }
        })
    }

    // delete from neighbours of each other server
    serverList.forEach(s => {
        s.removeFromNeighbours(serverSelected.name);
        serverList = serverList.filter(f => f !== serverSelected);
    });

    // delete the node
    groupSelected.destroy();
    // update the dom
    menu.style.display = 'none';

    // handle create link button
    if (serverList.length <= 1) {
        createLinkButton.style.display = 'none';
    }

    serverSelected = undefined;
});

document.getElementById('cancelbutton').addEventListener('click', () => {
    serverSelected = undefined;
    menu.style.display = 'none';
});

document.getElementById('addappbutton').addEventListener('click', () => {
    newServerForm.style.display = 'none';
    menu.style.display = 'none';
    document.getElementById('newappform').style.display = 'flex';
    document.getElementById('urlnewapp').value = '';
    document.getElementById('urlcontent').value = '';
});
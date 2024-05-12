document.getElementById('browserbutton').addEventListener('click', () => {
    browser.style.display = 'flex';
    document.getElementById('browserTitle').textContent = serverSelected.name + ' browser';
    menu.style.display = 'none';
});

document.getElementById('urllistbutton').addEventListener('click', () => {
    newServerForm.style.display = 'block';
    menu.style.display = 'none';
    document.getElementById('title').textContent = 'URL list';
    document.getElementById('createServer').style.display = 'block';
    document.getElementById("name").readOnly = true;
    document.getElementById('createLinkLabels').style.display = 'none';
    document.getElementById('delete').style.display = 'none';
    document.getElementById('save').style.display = 'none';
    document.getElementById('cancel').style.display = 'block';

    document.getElementById("name").value = serverSelected.name;
    serverSelected.urlList.forEach(url => {
        var li = document.createElement('li');
        li.textContent = url;
        document.getElementById('urlList').appendChild(li);
    });
})

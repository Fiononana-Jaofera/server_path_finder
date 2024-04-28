var serverList = [];

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        var newServerForm = document.getElementById("newServerForm");
        newServerForm.style.display = (newServerForm.style.display !== 'none')? 'none': 'block';
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
})

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
        document.getElementById('result').textContent = JSON.stringify(serverList);
        document.getElementById("newServerForm").style.display = 'none';

        server.display();
    }
})
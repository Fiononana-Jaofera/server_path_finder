var newappform = document.getElementById('newappform');
document.getElementById('urlsavebutton').addEventListener('click', () => {
    var url = document.getElementById('urlnewapp').value;
    var urlcontent = document.getElementById('urlcontent').value;
    if (url.length > 0 && urlcontent.length > 0 && !serverSelected.applicationList.some(a => a.url == url)) {
        serverSelected.setApplication({
            url: url,
            content: urlcontent
        });
        newappform.style.display = 'none';
        menu.style.display = 'flex';
    }
    else {
        alert('input not valid');
    }
});

document.getElementById('urlexitbutton').addEventListener('click', () => {
    newappform.style.display = 'none';
    menu.style.display = 'flex';
})
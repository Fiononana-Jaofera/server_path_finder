import { io } from "socket.io-client";
class Server {
    constructor(name) {
        this.name = name;
        this.group = new Konva.Group({
            draggable: true,
            id: this.name,
            dragBoundFunc: function (pos) {
                var x = pos.x;
                var y = pos.y;
                return { x: x, y: y };
            }
        })
        this.neighbours = [];
        this.x = 0;
        this.y = 0;
        this.weight = Infinity;
        this.applicationList = [];

        // create socket
        this.socket = io("http://localhost:3000");
        this.id = 0;
        // handle socket event
        this.socket.on('connect', () => {
            this.id = this.socket.id;
        });
        this.socket.on('send-request', (from, url, path) => {
            console.log(`server ${this.name} receive an request`);
            console.log('request from ' + from);
            console.log('url ' + url);
            console.log('path ' + path);
            if (this.applicationList.length > 0 && this.applicationList.some(a => a.url == url)) {
                var prev_server_idx = path.indexOf(this.id) - 1;
                this.socket.emit('response', path, this.getContent(url), this.id, path[prev_server_idx]);
            }
            else {
                var next_server_idx = path.indexOf(this.id) + 1;
                this.socket.emit('request', path, this.id, path[next_server_idx], url);
            }
        });
        this.socket.on('send-response', (path, content, from) => {
            console.log(`server ${this.name} receive an response`);
            console.log('response from ' + from);
            console.log('path ' + path);
            if(path[0] == this.id) {
                document.getElementById('content').innerHTML = content;
            }
            else {
                var prev_server_idx = path.indexOf(this.id) - 1;
                this.socket.emit('response', path, content, this.id, path[prev_server_idx]);
            }
        })
    }

    display() {
        var group = this.group

        var text = new Konva.Text({
            x: width / 3 - 12,
            y: height / 2 + 90,
            text: this.name,
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'black',
            padding: 0,
            width: 100,
            height: 30,
            align: 'center',
            valign: 'middle'
        });

        group.add(text);

        Konva.Image.fromURL('assets/images/server.png', function (image) {
            group.add(image);
            image.setAttrs({
                x: width / 3,
                y: height / 2,
                scaleX: 0.15,
                scaleY: 0.15,
            });
            image.cache();
        });

        layer.add(group);
        this.group = group;
        this.group.on('dragmove', () => {
            this.x = this.group.x();
            this.y = this.group.y();
            updateConnector(this);
        })
    }

    setNeighbours(neighbour) {
        this.neighbours.push(neighbour);
    }

    removeFromNeighbours(neighbour_name) {
        var temp = this.neighbours.filter(n => n.server.name !== neighbour_name);
        this.neighbours = temp;
    }

    setApplication(app) {
        this.applicationList.push(app);
    }

    getContent(url) {
        var app = this.applicationList.find(a => a.url == url);
        return app.content;
    }
}

window.Server = Server;
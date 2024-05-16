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
        this.socket = io("http://localhost:3000");
        this.id = 0;
        this.socket.on('connect', () => {
            this.id = this.socket.id;
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

    getNeighbours() {
        return this.neighbours;
    }

    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
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
class Server {
    constructor(name, urlList) {
        this.name = name;
        this.urlList = [...urlList];
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
    }

    display() {
        var group = this.group

        var text = new Konva.Text({
            x: -12,
            y: 90,
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

        Konva.Image.fromURL('/assets/images/server.png', function (image) {
            group.add(image);
            image.setAttrs({
                x: 0,
                y: 0,
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

    getUrlList() {
        return this.urlList;
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
        var temp = this.neighbours.filter(n => n.from !== neighbour_name && n.to !== neighbour_name);
        this.neighbours = temp;
    }
}
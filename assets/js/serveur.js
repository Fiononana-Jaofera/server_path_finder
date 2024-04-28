class Server {
    constructor(name, urlList) {
        this.name = name;
        this.urlList = [...urlList];
        this.group = new Konva.Group({
            draggable: true,
        })
        this.neighbours = [];
    }

    display() 
    {
        var group = this.group

        var text = new Konva.Text({
            x: width/2 - 12,
            y: height/2 + 90,
            text: this.name,
            fontSize: 18,
            fill: 'black',
            width: 100,
            height: 30,
            align: 'center',
            fontStyle: 'bold',
        });

        group.add(text);

        Konva.Image.fromURL('/assets/images/server.png', function (image) {
            group.add(image);
            image.setAttrs({
                x: width/2,
                y: height/2,
                scaleX: 0.15,
                scaleY: 0.15,
            });
            image.cache();
        });

        layer.add(group);
        this.group = group;
    }

    setNeighbours(neighbour) 
    {
        this.neighbours.push(neighbour);
    }

    getUrlList() 
    {
        return this.urlList;
    }

    getNeighbours() 
    {
        return this.neighbours;
    }
}
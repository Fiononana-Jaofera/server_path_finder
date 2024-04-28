class Server {
    constructor(name, urlList) {
        this.name = name;
        this.urlList = [...urlList];
    }

    display() {
        var group = new Konva.Group({
            draggable: true,
        })

        var text = new Konva.Text({
            x: 90,
            y: 190,
            text: this.name,
            fontSize: 18,
            fontFamily: 'Calibri',
            fill: 'black',
            width: 100,
            height: 30,
            align: 'center',
            fontStyle: 'bold',
            textDecoration: 'underline'
        });

        group.add(text);

        Konva.Image.fromURL('/assets/images/server.png', function (image) {
            group.add(image);
            image.setAttrs({
                x: 100,
                y: 100,
                scaleX: 0.15,
                scaleY: 0.15,
            });
            image.filters([Border]);
            image.cache();
        });

        layer.add(group)
    }
}
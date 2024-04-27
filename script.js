var width = window.innerWidth;
var height = window.innerHeight;

var container = document.getElementById('container')

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

var layer = new Konva.Layer();
stage.add(layer);

// function to generate a list of "targets" (circles)
function generateTargets() {
    var number = 10;
    var result = [];
    while (result.length < number) {
        result.push({
            id: 'target-' + result.length,
            x: 100,
            y: 100
        });
    }
    return result;
}

var targets = generateTargets();

// function to generate arrows between targets
function generateConnectors() {
    var number = 10;
    var result = [];
    while (result.length < number) {
        var from = 'target-' + Math.floor(Math.random() * targets.length);
        var to = 'target-' + Math.floor(Math.random() * targets.length);
        if (from === to) {
            continue;
        }
        result.push({
            id: 'connector-' + result.length,
            from: from,
            to: to,
        });
    }
    return result;
}

function getConnectorPoints(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    let angle = Math.atan2(-dy, dx);

    const radius = 50;

    return [
        from.x + -radius * Math.cos(angle + Math.PI),
        from.y + radius * Math.sin(angle + Math.PI),
        to.x + -radius * Math.cos(angle),
        to.y + radius * Math.sin(angle),
    ];
}

var connectors = generateConnectors();

// update all objects on the canvas from the state of the app
function updateObjects() {
    targets.forEach((target) => {
        var node = layer.findOne('#' + target.id);
        node.x(target.x);
        node.y(target.y);
    });
    connectors.forEach((connect) => {
        var line = layer.findOne('#' + connect.id);
        var fromNode = layer.findOne('#' + connect.from);
        var toNode = layer.findOne('#' + connect.to);

        const points = getConnectorPoints(
            fromNode.position(),
            toNode.position()
        );
        line.points(points);
    });
}

container.addEventListener('click', function (e) {
    // Calculate the position of the click relative to the canvas
    var rect = container.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    // Draw a red circle at the click position
    var circle = new Konva.Circle({
        id: 'aaa',
        fill: 'red',
        radius: 50,
        draggable: true,
    })
    layer.add(circle)
    circle.x(x);
    circle.y(y);
});

// generate nodes for the app
connectors.forEach((connect) => {
    var line = new Konva.Arrow({
        stroke: 'black',
        id: connect.id,
        fill: 'black',
    });
    layer.add(line);
});

targets.forEach((target) => {
    var node = new Konva.Circle({
        id: target.id,
        fill: Konva.Util.getRandomColor(),
        radius: 20,
        shadowBlur: 10,
        draggable: true,
    });
    layer.add(node);

    node.on('dragmove', () => {
        // mutate the state
        target.x = node.x();
        target.y = node.y();

        // update nodes from the new state
        updateObjects();
    });
});

updateObjects();
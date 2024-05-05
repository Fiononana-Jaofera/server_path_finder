// class Server {
//     constructor() {
//         this.weight = Infinity;
//         this.neighbours = [];
//     }
//     getNeighbours() {
//         return this.neighbours;
//     }
//     setNeighbours(neighbours) {
//         this.neighbours.push(neighbours);
//     }
// }

// var A = new Server();
// var B = new Server();
// var C = new Server();
// var D = new Server();
// var E = new Server();

// A.setNeighbours({
//     server : B,
//     weight : 10
// });
// A.setNeighbours({
//     server : C,
//     weight : 2
// });
// B.setNeighbours({
//     server : A,
//     weight : 10
// });
// B.setNeighbours({
//     server : D,
//     weight : 1
// });
// C.setNeighbours({
//     server : A,
//     weight : 2
// });
// C.setNeighbours({
//     server : D,
//     weight : 4
// });
// D.setNeighbours({
//     server : B,
//     weight: 1
// });
// D.setNeighbours({
//     server : C,
//     weight: 4
// });
// D.setNeighbours({
//     server : E,
//     weight: 4
// });
// E.setNeighbours({
//     server: D,
//     weight: 4,
// })
// var serverList = [A, B, C, D];

function dijskra(node_start) {
    node_start.weight = 0;
    node_start.pred = node_start;
    var in_progress = [node_start];
    var i = 0;
    var node = (in_progress.length > 1)? in_progress.reduce((prev, curr) => {
        return (prev.weight < curr.weight) ? prev : curr;
    }, in_progress[0])[0] : in_progress[0];
    console.log(node)
    // while (in_progress.length > 0) {
    //     var node = (in_progress.length > 1)? in_progress.reduce((prev, curr) => {
    //         return (prev.weight < curr.weight) ? prev : curr;
    //     }, in_progress[0])[0] : in_progress[0];
    //     node.getNeighbours().forEach(neighbour => {
    //         if (neighbour.server.weight > neighbour.weight + node.weight) {
    //             neighbour.server.weight = neighbour.weight + node.weight;
    //             neighbour.server.pred = node;
    //             in_progress.push(neighbour.server);
    //         }
    //     });
    //     in_progress = in_progress.filter(x => x !== node);
    // }
}

function generate_road(node_start, node_end) {
    var q = node_end;
    var result = [q];
    while (q!==node_start) {
        result.push(q.pred);
        q = q.pred;
    }
    return result.reverse();
}

// dijskra(A);
// var result = generate_road(A, B);
// console.log(result);
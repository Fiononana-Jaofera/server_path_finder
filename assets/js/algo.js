function dijkstra(node_start) {
    node_start.weight = 0;
    node_start.pred = node_start;
    var in_progress = [node_start];
    while (in_progress.length > 0) {
        var node = in_progress.reduce((prev, curr) => {
            return (prev.weight < curr.weight) ? prev : curr;
        }, in_progress[0]);
        node.neighbours.forEach(neighbour => {
            if (neighbour.server.weight > neighbour.weight + node.weight) {
                neighbour.server.weight = neighbour.weight + node.weight;
                neighbour.server.pred = node;
                in_progress.push(neighbour.server);
            }
        });
        in_progress = in_progress.filter(x => x !== node);
    }
}

function generate_road(node_start, node_end) {
    var q = node_end;
    var result = [q];
    try {
        while (q!==node_start) {
            result.push(q.pred);
            q = q.pred;
        }
        return result.reverse();
    } catch (error) {
        return [];
    }
}
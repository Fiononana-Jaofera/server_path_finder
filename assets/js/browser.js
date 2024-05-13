var browser = document.getElementById('browser');
var menu = document.getElementById('serverMenu');


// handle navigate url event
document.getElementById('navigate').addEventListener('click', () => {
  var text = stage.find('#result')[0];
  if (text != undefined) text.destroy();
  
  var url = document.getElementById('url').value;
  if (url.length > 0) {
      // var name = document.getElementById('name').value;
      // var server_start = serverList.filter(s => s.name == name)[0];
      var server_start = serverSelected;
      var serverfound = serverList.filter(s => s.urlList.includes(url));
      if (serverfound.length > 0) {
          dijkstra(server_start);

          // find the server end which have the smallest weight
          var server_end = serverfound.reduce((prev, curr) => {
              return (prev.weight < curr.weight) ? prev : curr;
          }, serverfound[0]);

          // generate the road
          var result = generate_road(server_start, server_end);

          // update the dom
          if (result.length > 0) {
              for (var i = 0; i < result.length - 1; i++) {
                  var j = i + 1;
                  var from = result[i];
                  var to = result[j];
                  var line = edges.find(e => e.attrs.id == from + '-' + to || e.attrs.id == to + '-' + from);
                  line.stroke('green');
                  layer.batchDraw();
              }

              var text_result = new Konva.Text({
                  id: 'result',
                  x: width / 2,
                  y: height - 40,
                  text: `ping from ${result[0]} to ${url} take ${server_end.weight}ms.`,
                  fontSize: 20,
                  fontFamily: 'Calibri',
                  fill: 'black',
                  fontStyle: 'bold',
              });
              layer.add(text_result);
          }
          else {
              var text_result = new Konva.Text({
                  id: 'result',
                  x: width / 2,
                  y: height - 40,
                  text: `no path found to ping ${url} from ${server_start.name}`,
                  fontSize: 20,
                  fontFamily: 'Calibri',
                  fill: 'black',
                  fontStyle: 'bold',
              });
              layer.add(text_result);
          }
      }
      else {
          var text_result = new Konva.Text({
              id: 'result',
              x: width / 2,
              y: height - 40,
              text: `server which contain ${url} url doesn't exist`,
              fontSize: 20,
              fontFamily: 'Calibri',
              fill: 'black',
              fontStyle: 'bold',
          });
          layer.add(text_result);
      }
      newServerForm.style.display = 'none';
      document.getElementById('reset').style.display = 'block';
  }
});


document.getElementById('exit').addEventListener('click', () => {
  browser.style.display = 'none';
  menu.style.display = 'flex';
})
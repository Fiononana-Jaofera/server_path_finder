document.addEventListener('DOMContentLoaded', function() {
    var draggableDiv = document.getElementById('browser');
    var offsetX, offsetY;
  
    // Mouse down event
    draggableDiv.addEventListener('mousedown', function(e) {
      offsetX = e.clientX - parseInt(window.getComputedStyle(draggableDiv).left);
      offsetY = e.clientY - parseInt(window.getComputedStyle(draggableDiv).top);
      document.addEventListener('mousemove', onMouseMove, false);
      document.addEventListener('mouseup', onMouseUp, false);
    });
  
    // Mouse move event
    function onMouseMove(e) {
      var x = e.clientX - offsetX;
      var y = e.clientY - offsetY;
      draggableDiv.style.left = x + 'px';
      draggableDiv.style.top = y + 'px';
    }
  
    // Mouse up event
    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove, false);
      document.removeEventListener('mouseup', onMouseUp, false);
    }
  });
  
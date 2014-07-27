/*
 * Serve content over a socket
 */

module.exports = function (socket) {
  socket.emit('send:gval', {
    gval: 50
  });

//  setInterval(function () {
//    socket.emit('send:time', {
//      time: (new Date()).toString()
//    });
//  }, 1000);
};
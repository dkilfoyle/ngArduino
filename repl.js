var five = require("johnny-five"),
  board;

board = new five.Board();
ss = five.Serial.

board.on("ready", function() {
  console.log("Ready event. Repl instance auto-initialized");

  this.repl.inject({
    test: "foo"
  });
});

window.onload = function() {
  var game = new Game("canvas");
  document.getElementById("start-button").onclick = function() {
    $('.game-intro').css('display','none');
    $('canvas').css('display','block');
    game.drawCrono();
    game.cronom();
    game.time();
  }
  game.start();
};

function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.reset();
  this.crono = 60;
}

/* start */
Game.prototype.start = function () {
  this.clear();
  this.draw();
  this.drawCrono();
  this.moveAll();
  this.framesCounter++;
  //esto controla la velocidad a la que se generan los obstaculos
  if (this.framesCounter % 60 == 0) {
    this.generateObjects();
  }
  if (this.isCollision()) {}
  if (this.framesCounter % 200 == 0) {
    this.clearObjects();
  }
  window.requestAnimationFrame(this.start.bind(this));
};
/* inicia un nuevo juego */
Game.prototype.reset = function () {
  this.background = new Background(this);
  this.player1 = new Player(this, 0);
  this.player2 = new Player(this, 1);
  this.players = [];
  this.players.push(this.player1, this.player2);
  this.framesCounter = 0;
  this.objects = [];
  this.crono = 60;
  this.cronom();
  this.time();
};

Game.prototype.time = function () {
  setTimeout(function () {
    clearInterval(this.cronominterval)
    // this.stop(); 
    if (confirm("FIN DEL TIEMPO")) {
      this.reset();

    }
  }.bind(this), 60000);
}

//limpia intervalos
Game.prototype.stop = function () {
  clearInterval(this.interval);
};

Game.prototype.clearObjects = function () {
  this.objects.shift()
}

/* clear */
Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

/* draw */
Game.prototype.draw = function () {
  this.background.draw();
  this.players.forEach(function (player, index) {
    player.draw();
  })
  this.objects.forEach(function (a) {
    a.draw();
  })
  this.drawPoints();
  this.drawCrono();
};

/* cosas a mover */
Game.prototype.moveAll = function () {
  this.players.forEach(function (player, index) {
    player.move();
  })
}

Game.prototype.generateObjects = function () {
  var type = Math.floor(Math.random() * 3)
  this.objects.push(new Objects(this, type))
}

Game.prototype.isCollision = function () {
  return this.objects.forEach(function (obj, index) {
    this.players.forEach(function (player) {
      if (
        ((player.x + player.w) >= obj.x &&
          player.x < obj.x + obj.w) &&
        (player.y + player.h) >= obj.y &&
        player.y < obj.y + obj.h) {
        player.points += obj.points;
        this.objects.splice(index, 1);
      }
    }.bind(this));
  }.bind(this));
}

// dibujar puntos en la pantalla
Game.prototype.drawPoints = function () {
  this.players.forEach(function (player, index) {
    this.ctx.font = "60px Verdana";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(Math.floor(player.points), 50 + 1150 * index, 50);
  }.bind(this))
}

Game.prototype.drawCrono = function () {
  this.ctx.font = "100px sans-serif";
  this.ctx.fillStyle = "black";
  this.ctx.fillText(this.crono, 550, 100)
}

Game.prototype.cronom = function () {
  this.cronominterval = setInterval(function () {
    this.crono--;
  }.bind(this), 1000)
}
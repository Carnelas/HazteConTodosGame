function Player(game, number) {
  this.game = game;
  this.img = new Image();
  this.number = number;
  this.setKeys(this.number);
  this.setListeners();
  this.points = 0;
  //posición en la pantalla

  this.topSpeed = 20;
  this.speedX = 0;
  this.speedY = 0;

  // número de imágenes diferentes
  this.img.frames = 4;
  //al mover esto la imagen cambia en horizontal
  this.img.frameIndex = 0;

  // medidas de la imagen a representar en el canvas
  this.w = 50;
  this.h = 70;
  this.vy = 1;
}

// draw de player
Player.prototype.draw = function () {
  this.game.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    this.direc,
    Math.floor(this.img.width / this.img.frames),
    this.img.width / this.img.frames,
    this.x,
    this.y,
    this.w,
    this.h
  );
  this.animateImg();
}


Player.prototype.move = function (pos, speed) {
  var nextPosX = this.x + this.speedX;
  var nextPosY = this.y + this.speedY;
  if ((nextPosX <= 0 || nextPosX >= 1330) || (nextPosY <= 0 || nextPosY >= 730)) {
    this.x -= this.speedX;
    this.y -= this.speedY;
    return false;
  }
  return true;
};

Player.prototype.setListeners = function () {
  document.addEventListener("keydown", function (event) {
    if (event.keyCode == this.TOP_KEY && this.move()) {
      this.speedX = 0;
      this.topSpeed = 10;
      this.y -= 1;
      this.speedY = -this.topSpeed;
      this.y += this.speedY;
      this.direc = 3 * this.img.height / this.img.frames

    } else if (event.keyCode == this.LOW_KEY && this.move()) {
      this.speedX = 0;
      this.topSpeed = 10;
      this.y += 1;
      this.speedY = this.topSpeed;
      this.y += this.speedY;
      this.direc = 0;
    }
    if (event.keyCode == this.RIGHT_KEY && this.move()) {
      this.speedX = this.topSpeed;
      this.topSpeed = 10;
      this.x += 1;
      this.speedy = 0;
      this.x += this.speedX;
      this.direc = 2 * this.img.height / this.img.frames;

    } else if (event.keyCode == this.LEFT_KEY && this.move()) {
      this.speedX = -this.topSpeed;
      this.topSpeed = 10;
      this.x -= 1;
      this.speedY = 0;
      this.x += this.speedX;
      this.direc = 1 * this.img.height / this.img.frames;
    }
  }.bind(this))
}

Player.prototype.animateImg = function () {
  // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
  if (this.game.framesCounter % 10 === 0) {
    this.img.frameIndex += 1;
    // Si el frame es el último, se vuelve al primero
    if (this.img.frameIndex > 3) this.img.frameIndex = 0;
  }
};
Player.prototype.setKeys = function (number) {
  switch (number) {
    case 0:
      this.TOP_KEY = 87;
      this.LOW_KEY = 83;
      this.RIGHT_KEY = 68;
      this.LEFT_KEY = 65;
      this.img.src = "images/player.png";
      this.x = this.game.canvas.width * 0.2;
      this.y = this.game.canvas.height * 0.2;
      break;

    case 1:
      this.TOP_KEY = 38;
      this.LOW_KEY = 40;
      this.RIGHT_KEY = 39;
      this.LEFT_KEY = 37;
      this.img.src = "images/player2.png";
      this.x = 1200;
      this.y = 600;
      break;
  }
}



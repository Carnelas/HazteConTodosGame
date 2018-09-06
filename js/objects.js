function Objects(game, type) {
  this.game = game;
  this.img = new Image();
  this.type = type;
  
  switch (this.type) {
    case 0:
    this.points = 1;
    this.img.src = 'images/coffee.png';
    break;
    case 1:
    this.points = 5;
    this.img.src = 'images/onigiri.gif';
    break;
    case 2:
    this.points = 10;
    this.img.src = 'images/pokeball.png';
  }
//dentro del switch añadir intervalos de tiempo para cada objeto

this.x = Math.floor(Math.random() * 1300);
this.y = Math.floor(Math.random() * 700);

  // draw de objeto
  Object.prototype.draw = function() {
    this.game.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
  
// medidas de la imagen a representar en el canvas
  this.w = 40;
  this.h = 50;
  }

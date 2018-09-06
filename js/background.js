function Background(game) {
    this.game = game;
    this.img = new Image();
    this.img.src = 'images/Giant_Chasm_Entrance_Summer_BW.png';
    this.x = 0;
    this.y = 0;
    this.dx = 10;
  }
  
  Background.prototype.draw = function() {
    
    this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.drawImage(this.img, this.x + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height);
  };

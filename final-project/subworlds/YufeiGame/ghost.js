function Ghost(x,y,img){
  this.x = x;
  this.y = y;
  this.radius = 16;
  this.img = img;
  this.velocity = 32;
  this.movement = false;
  this.direction = 0;

  this.show = function(){
    imageMode(CENTER);
    image(this.img,this.x,this.y,32,32);
  }
  
  
  this.outOfBox = function(platform){
    if(platform.getElement(this.y/32 - 2,this.x/32) === 'd') {
      this.y -= 64;
    } else {
      this.y -= 96;
    }
  }

  this.move = function(bricks){
      var newDirection = floor(random(4));
      if(this.movement === true) {
        newDirection = this.direction
      }
      var lastX = this.x;
      var lastY = this.y;
      if(newDirection === 0) {
        this.x += this.velocity;
      }
      if(newDirection === 1) {
        this.x -= this.velocity;
      }
      if(newDirection === 2) {
        this.y -= this.velocity;
      }
      if(newDirection === 3) {
        this.y += this.velocity;
      }
      for(var i = 0; i < bricks.length; i++){
        if(this.collision(bricks[i])){
          this.x = lastX;
          this.y = lastY;
          this.movement = false;
          this.move(bricks);
        }
      }
      this.movement = true;
      this.direction = newDirection;
      if(this.x < 32 * 8) {
          this.x = 32 * 2;
          this.y = 32 * 2;
      }
      else if (this.x > 32 * 29) {
          this.x = 32 * 28;
          this.y = 32 * 21;
      }
  }


  this.collision = function(obj){
    var distance = dist(this.x,this.y,obj.x,obj.y);
    if(distance < this.radius + obj.radius) {
      return true;
    } else {
      return false;
    }
  }

}
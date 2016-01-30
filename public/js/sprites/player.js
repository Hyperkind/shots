(function () {

  var WALK_SPEED = 401;
  var JUMP_HEIGHT = 1230;

  // var FACING_FACTOR = {
  //   LEFT : -1,
  //   RIGHT : 1
  // };

  Shots.Player = function (game, id, name) {
    this.game = game;
    this.id = id;
    this.name = name? name : 'Player ' +(id+1);
    this.coffeeCounter = 0;
    // this.facing;

    Phaser.Sprite.call(this, game, 0, 0, Shots.ASSETS.SPRITESHEET.PLAYER.name);

    // enable physics (adds this.body)
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // use stage bounding box
    this.body.collideWorldBounds = true;

  };

  Shots.Player.prototype = Object.create(Phaser.Sprite.prototype, {
    constructor: {
      value: Shots.Player
    }
  });

  // public statis variable
  // Shots.Player.FACING = {
  //   LEFT : 'LEFT',
  //   RIGHT : 'RIGHT'
  // };

  // is invoked on every frame
  Shots.Player.prototype.update = function(){

    // update facing
    // if( this.alive ){
    //   this.scale.x = FACING_FACTOR[ this.facing ];
    // }

    // update animations
    // if(!this.alive){
    //   this.animations.play(ANIMATIONS.DEAD.name);
    // }else if(this.is_diving){
    //   this.animations.play(ANIMATIONS.DIVE.name);
    // }else{
    //   if(this.body.y < Shots.Game.FLOOR_Y){ // in the air
    //     this.animations.play(ANIMATIONS.JUMP.name);
    //   } else if(this.body.velocity.x !== 0){ // running
    //     this.animations.play(ANIMATIONS.WALK.name, ANIMATIONS.WALK.fps, true);
    //   } else {
    //     this.animations.play(ANIMATIONS.IDLE.name, ANIMATIONS.IDLE.fps, true);
    //   }
    // }

  };

  // Input actions
  Shots.Player.prototype.jump = function () {
    // if(!this.alive) return;
    // allow jumping from the floor (not in mid air)
    if( this.body.y === Shots.Game.FLOOR_Y ){
      this.body.velocity.y = -JUMP_HEIGHT;
    }
    // else if( this.is_diving ){ // allow jump after dive (in mid air)
    //   this.body.velocity.y = -JUMP_HEIGHT*(this.body.y/Shots.Game.FLOOR_Y);
    // }

  };

  Shots.Player.prototype.step_left = function () {
    if(!this.alive) return;
    this.body.velocity.x = -WALK_SPEED;
  };

  Shots.Player.prototype.step_right = function () {
    if(!this.alive) return;
    this.body.velocity.x = WALK_SPEED;
  };

  Shots.Player.prototype.stop = function () {
    this.body.velocity.x = 0;
  };



})();
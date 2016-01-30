(function () {

  var WALK_SPEED = 401;

  Shots.Player = function (game, id, name) {
    this.game = game;
    this.id = id;
    this.name = name? name : 'Player ' +(id+1);

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
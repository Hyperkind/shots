(function () {

  // setting up animations
  var ANIMATIONS = {
    WALK : {
      name : 'walk',
      frames : [1, 2, 3, 4],
      fps : 10
    },
    JUMP : {
      name : 'jump',
      frames : [0],
      fps : 1
    }
  };

  var WALK_SPEED = 401;
  var JUMP_HEIGHT = 800;
  var JUMP_COUNT = 0;

  // var FACING_FACTOR = {
  //   LEFT : -1,
  //   RIGHT : 1
  // };

  function select_sprite_row (player_id) {
    return function (frame_id) {
      return frame_id + player_id * Shots.ASSETS.SPRITESHEET.PLAYER.frames_per_row;
    };
  }

  Shots.Player = function (game, id, name, fx, zoidbergSound, ninjaHitSound) {
    this.game = game;
    this.id = id;
    this.name = name? name : 'Player ' +(id+1);
    this.coffeeCounter = 0;
    this.fx = fx;
    this.zoidbergSound = zoidbergSound;
    this.ninjaHitSound = ninjaHitSound;
    // this.facing;

    Phaser.Sprite.call(this, game, 0, 0, Shots.ASSETS.SPRITESHEET.PLAYER.name);

    // enable physics (adds this.body)
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // use stage bounding box
    this.body.collideWorldBounds = true;

    this.animations.add(ANIMATIONS.WALK.name, ANIMATIONS.WALK.frames.map(select_sprite_row(this.id)));
    this.animations.add(ANIMATIONS.JUMP.name, ANIMATIONS.JUMP.frames.map(select_sprite_row(this.id)));

    this.animations.play(ANIMATIONS.WALK.name, ANIMATIONS.WALK.fps, true);

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

  // resets JUMP_COUNT to 0 upon landing
  if (this.body.y === 480) {
    JUMP_COUNT = 0;

  }

  };

  // Input actions
  Shots.Player.prototype.jump = function () {
    // if(!this.alive) return;
    // allows double jump
    if( JUMP_COUNT <= 1) {
      JUMP_COUNT++;
      this.body.velocity.y = -JUMP_HEIGHT;

    }

    this.fx.play();

  };

  Shots.Player.prototype.step_left = function () {
    if(!this.alive) return;
    this.body.velocity.x = -WALK_SPEED;
  };

  Shots.Player.prototype.step_right = function () {
    if(!this.alive) return;
    if (this.body.y === Shots.Game.FLOOR_Y) {
      this.body.velocity.x = WALK_SPEED;
    } else {
      this.body.velocity.x = WALK_SPEED*2.5;
    }
  };

  Shots.Player.prototype.stop = function () {
    this.body.velocity.x = 0;
  };

})();
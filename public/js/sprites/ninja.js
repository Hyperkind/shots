(function() {

  Shots.Ninja = function(game, id, name) {
    this.game = game;
    this.id = id;
    this.name = name;

    // super constructor call
    Phaser.Sprite.call(this, game, 0, 0, Shots.ASSETS.SPRITESHEET.NINJA.name);

    // enable physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // checks if coffee is within the world bounds. If not, should kill it
    this.checkWorldBounds = true;
    this.outOfBoundsKill = false;
    // this.exists = false;

    // set center registration point
    this.anchor = { x : 0.5, y : 0.5 };

  };

  Shots.Ninja.prototype = Object.create(Phaser.Sprite.prototype, {
    constructor: {
      value: Shots.Ninja
    }
  });

})();
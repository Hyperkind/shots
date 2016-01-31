(function() {

  Shots.Whiskey = function(game, id, name) {
    this.game = game;
    this.id = id;
    this.name = name;

    // super constructor call
    Phaser.Sprite.call(this, game, 0, 0, Shots.ASSETS.SPRITESHEET.WHISKEY.name);

    // enable physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // checks if whiskey is within the world bounds. If not, should kill it
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    // this.exists = false;

    // set center registration point
    this.anchor = { x : 0.5, y : 0.5 };

  };

  Shots.Whiskey.prototype = Object.create(Phaser.Sprite.prototype, {
    constructor: {
      value: Shots.Whiskey
    }
  });

})();
(function() {

  Shots.Coffee = function(game, id, name) {
    this.game = game;
    this.id = id;
    this.name = name;

    // super constructor call
    Phaser.Sprite.call(this, game, 0, 0, Shots.ASSETS.SPRITESHEET.COFFEE.name);

    // enable physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // set center registration point
    this.anchor = { x : 0.5, y : 0.5 };
  };

  Shots.Coffee.prototype = Object.create(Phaser.Sprite.prototype, {
    constructor: {
      value: Shots.Coffee
    }
  });

})();
(function () {
  Shots.Player = function (game, id, name) {
    this.game = game;
    this.id = id;
    this.name = name? name : 'Player ' +(id+1);
  };

  Shots.Player.prototype = Object.create(Phaser.Sprite.prototype, {
    constructor: {
      value: Shots.Player
    }
  });

})();
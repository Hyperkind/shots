(function () {

  var INITIAL_POSITIONS = [
    // Player 1
    // where we want player to start on screen
    {x: 100, y: 450},
  ];

  var MATCH = {
    PRE : "PRE",
    IN_PROGRESS : "IN_PROGRESS",
    RESOLVED : "RESOLVED"
  };

  Shots.Game = function () {

    this.player_1;
    this.input; // direction that player faces
    this.match_state; // ???

  };

  Shots.Game.prototype.create = function () {

    this.match_state = MATCH.IN_PROGRESS;
    this.game.add.tileSprite(0,0,Shots.ASSETS.IMAGE.BG.width,Shots.ASSETS.IMAGE.BG.height, Shots.ASSETS.IMAGE.BG.name);

    this.player_1 = new Shots.Player(this.game, 0);
    this.game.add.existing(this.player_1);

    //position players
    this.player_1.x = INITIAL_POSITIONS[0].x;
    this.player_1.y = INITIAL_POSITIONS[0].y;

    // initialize input handler
    // this.input = new Shots.GameInput(this);

  };

  Shots.Game.FLOOR_Y = 400;

})();
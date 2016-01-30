(function () {

  var GRAVITY = 1945;

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
    this.coffee;
    this.input; // direction that player faces
    this.match_state; // ???

  };

  Shots.Game.prototype.create = function () {

    this.match_state = MATCH.IN_PROGRESS;
    this.background = this.game.add.tileSprite(0,0,Shots.ASSETS.IMAGE.BG.width,Shots.ASSETS.IMAGE.BG.height, Shots.ASSETS.IMAGE.BG.name);
    this.background.autoScroll(-40, 0);

    this.player_1 = new Shots.Player(this.game, 0);
    this.game.add.existing(this.player_1);

    // loads coffee
    this.coffee = new Shots.Coffee(this.game, 0);
    this.game.add.existing(this.coffee);

    //position players
    this.player_1.x = INITIAL_POSITIONS[0].x;
    this.player_1.y = INITIAL_POSITIONS[0].y;

    // initialize input handler
    this.input = new Shots.GameInput(this);

  };

  Shots.Game.FLOOR_Y = 450;

  Shots.Game.prototype.update = function () {

    // determine which direction each player is facing


    [this.player_1].forEach(function(player){
      // touching land or falling
      if(player.body.y > Shots.Game.FLOOR_Y){
        player.body.y = Shots.Game.FLOOR_Y;
        player.body.velocity.y = 0;
        player.body.acceleration.y = 0;
      }else{
        player.body.acceleration.y = GRAVITY;
      }

    });
  };

    // Input actions
  Shots.Game.prototype.continue = function () {
    if(this.match_state === MATCH.RESOLVED){
      this.state.start(Shots.STATES.BOOT);
    }
  };

})();
(function () {

  var GRAVITY = 1945;

  var INITIAL_POSITIONS = [
    // Player 1
    // where we want player to start on screen
    {x: 100, y: 450},
    // coffee initial position
    {x: 800, y: 150},
    // vodka initial position
    {x: 600, y: 150}
  ];

  var MESSAGE_STYLE = {
    font: "65px Arial",
    fill: "#ff0044",
    align: "center"
  };

  var MATCH = {
    PRE : "PRE",
    IN_PROGRESS : "IN_PROGRESS",
    RESOLVED : "RESOLVED"
  };

  var DEFAULT_FLASH_TIME = 3000; // ms

  var SCROLL_SPEED = -40;


  Shots.Game = function () {

    this.player_1;
    this.coffee;
    this.vodka;
    this.input; // direction that player faces
    this.match_state; // ???

  };

  Shots.Game.prototype.create = function () {
    var music = this.game.add.audio(Shots.ASSETS.AUDIO.NORMAL_WALK.name);
    music.play();
    music.loopFull(0.6);

    var fx = this.game.add.audio(Shots.ASSETS.AUDIO.JUMP.name);
    fx.allowMultiple = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.match_state = MATCH.IN_PROGRESS;
    this.background = this.game.add.tileSprite(0,0,Shots.ASSETS.IMAGE.BG_MORNING.width,Shots.ASSETS.IMAGE.BG_MORNING.height, Shots.ASSETS.IMAGE.BG_MORNING.name);
    this.background.autoScroll(SCROLL_SPEED, 0);

    this.player_1 = new Shots.Player(this.game, 0, 'teo', fx);
    this.game.add.existing(this.player_1);

    // loads coffee
    this.coffee = new Shots.Coffee(this.game, 0);
    this.game.add.existing(this.coffee);

    // loads vodka
    this.vodka = new Shots.Vodka(this.game, 0);
    this.game.add.existing(this.vodka);

    //position players & items
    this.player_1.x = INITIAL_POSITIONS[0].x;
    this.player_1.y = INITIAL_POSITIONS[0].y;

    this.coffee.x = INITIAL_POSITIONS[1].x;
    this.coffee.y = INITIAL_POSITIONS[1].y;

    this.vodka.x = INITIAL_POSITIONS[2].x;
    this.vodka.y = INITIAL_POSITIONS[2].y;

    // initialize input handler
    this.input = new Shots.GameInput(this);

  };

  Shots.Game.FLOOR_Y = 480;

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

    // gives gravity to coffee
    [this.coffee].forEach(function(coffee){
      // drops coffee to ground
      if(coffee.body.y > Shots.Game.FLOOR_Y){
        coffee.body.y = Shots.Game.FLOOR_Y;
        coffee.body.velocity.y = 0;
        coffee.body.acceleration.y = 0;
      }else{
      coffee.body.acceleration.y = GRAVITY;
      coffee.body.velocity.x = SCROLL_SPEED;
      }

    });

    // gives vodka to vodka
    [this.vodka].forEach(function(vodka){
      // drops vodka to ground
      if(vodka.body.y > Shots.Game.FLOOR_Y){
        vodka.body.y = Shots.Game.FLOOR_Y;
        vodka.body.velocity.y = 0;
        vodka.body.acceleration.y = 0;
      }else{
      vodka.body.acceleration.y = GRAVITY;
      vodka.body.velocity.x = -40;
      }

    });

    this.game.physics.arcade.overlap(this.player_1, this.coffee, null, collectCoffee, this);
    this.game.physics.arcade.collide(this.player_1, this.vodka);

  };


  function collectCoffee () {
    this.player_1.coffeeCounter++;
    console.log(this.player_1.coffeeCounter);
    this.coffee_notice();
    SCROLL_SPEED -= 40;
    this.background.autoScroll(SCROLL_SPEED, 0);
    return this.coffee.kill();
  }

  Shots.Game.prototype.flash = function(message, cb){

    var text = this.game.add.text(0, 0, message, MESSAGE_STYLE);
    text.x = this.game.world.centerX - text.width/2;

    // setTimeout(function(){
    //   text.destroy();
    //   if(cb) cb();
    // }, DEFAULT_FLASH_TIME);
  };

  Shots.Game.prototype.coffee_notice = function(){
    this.flash('Coffee Collect: ' + this.player_1.coffeeCounter);

  };

    // Input actions
  Shots.Game.prototype.continue = function () {
    if(this.match_state === MATCH.RESOLVED){
      this.state.start(Shots.STATES.BOOT);
    }
  };

})();
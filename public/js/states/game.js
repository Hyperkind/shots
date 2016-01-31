(function () {


  var INITIAL_POSITIONS = [
    // Player 1
    // where we want player to start on screen
    {x: 100, y: 450},
    // coffee initial position
    {x: 800, y: 150},
    // vodka initial position
    {x: 850, y: 150},
    // zoidberg initial position
    {x: 850, y: 400}
  ];

  var MATCH = {
    PRE : "PRE",
    IN_PROGRESS : "IN_PROGRESS",
    RESOLVED : "RESOLVED"
  };

  var FLASH_MESSAGE_STYLE = {
    font: "65px Arial",
    fill: "#ff0044",
    align: "center"
  };

  var DEFAULT_FLASH_TIME = 3000; // ms

  // Magic Numbers
  var SCROLL_SPEED = -40;
  var GRAVITY = 1945;

  // Scoreboard
  var scoreText;

  var distance;
  var distanceText;

  Shots.Game = function () {

    this.player_1;
    this.coffee = [];
    this.vodka = [];
    this.zoidberg = [];
    this.timer = 0;
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

    // create scoreboard
    scoreText = this.game.add.text(16, 16, 'Time Remaining: 60', {fontSize: '32px', fill: 'red'});

    // create distanceboard
    distanceText = this.game.add.text(400, 16, 'Distance Traveled: 0', {fontSize: '32px', fill: 'red'});

    this.player_1 = new Shots.Player(this.game, 0, 'teo', fx);
    this.game.add.existing(this.player_1);

    // loads coffee
    this.coffee.push(new Shots.Coffee(this.game, 0));
    this.game.add.existing(this.coffee[0]);

    // loads vodka
    this.vodka.push(new Shots.Vodka(this.game, 0));
    this.game.add.existing(this.vodka[0]);

    this.zoidberg.push(new Shots.Zoidberg(this.game, 0));
    this.game.add.existing(this.zoidberg[0]);

    //position players & items
    this.player_1.x = INITIAL_POSITIONS[0].x;
    this.player_1.y = INITIAL_POSITIONS[0].y;

    this.coffee[0].x = INITIAL_POSITIONS[1].x;
    this.coffee[0].y = INITIAL_POSITIONS[1].y;


    this.vodka[0].x = INITIAL_POSITIONS[2].x;
    this.vodka[0].y = INITIAL_POSITIONS[2].y;

    this.zoidberg[0].x = INITIAL_POSITIONS[3].x;
    this.zoidberg[0].y = INITIAL_POSITIONS[3].y;

    // initialize input handler
    this.input = new Shots.GameInput(this);

  };

  Shots.Game.FLOOR_Y = 480;

  Shots.Game.prototype.update = function () {
    this.timer++;

    // New coffee creator
    if(this.timer % Math.floor(Math.random() * 300 + 5) === 0){
      var newCoffee = new Shots.Coffee(this.game, 0);
      //randomize where it falls, maybe to right of player.x
      newCoffee.x = INITIAL_POSITIONS[1].x;
      // INITIAL_POSITIONS[1].x += 0;
      //make sure adding and pushing after setting newCoffee
      this.game.add.existing(newCoffee);
      this.coffee.push(newCoffee);
    }

    // vodka creator
    if(this.timer % Math.floor(Math.random() * 5000 + 5) === 0){
      var newVodka = new Shots.Vodka(this.game, 0);
      //randomize where it falls, maybe to right of player.x
      newVodka.x = INITIAL_POSITIONS[2].x;
      // INITIAL_POSITIONS[1].x += 0;
      //make sure adding and pushing after setting newVodka
      this.game.add.existing(newVodka);
      this.vodka.push(newVodka);
    }

    // Zoidberg creator
    if(this.timer % Math.floor(Math.random() * 2500) === 0){
      var newZoidberg = new Shots.Zoidberg(this.game, 0);
      newZoidberg.x = INITIAL_POSITIONS[3].x;
      newZoidberg.y = INITIAL_POSITIONS[3].y;
      this.game.add.existing(newZoidberg);
      this.zoidberg.push(newZoidberg);
    }

    // Refactor player/item physics
    function objectPhysics (obj, scrollSpeed, gravity) {
      if (obj.body.y > Shots.Game.FLOOR_Y){
        obj.body.y = Shots.Game.FLOOR_Y;
        obj.body.velocity.y = 0;
        obj.body.acceleration.y = 0;
      }else{
        obj.body.acceleration.y = gravity;
        obj.body.velocity.x = scrollSpeed;
      }
    }

    this.coffee.forEach(function(coffee){
      objectPhysics(coffee, SCROLL_SPEED, GRAVITY);
    });

    this.vodka.forEach(function(vodka) {
      objectPhysics(vodka, SCROLL_SPEED, GRAVITY);
    });

    this.zoidberg.forEach(function(zoidberg) {
      objectPhysics(zoidberg, SCROLL_SPEED);
    });


    // gives gravity to coffee
    [this.player_1].forEach(function(player){
      // drops player to ground
      if(player.body.y > Shots.Game.FLOOR_Y){
        player.body.y = Shots.Game.FLOOR_Y;
        player.body.velocity.y = 0;
        player.body.acceleration.y = 0;
      }else{
        player.body.acceleration.y = GRAVITY;
      }

    });

    var self = this;
    this.coffee.forEach(function(coffee){
      self.game.physics.arcade.overlap(self.player_1, coffee, null, collectCoffee.bind(self, coffee), self);
    });

    this.vodka.forEach(function(vodka) {
      self.game.physics.arcade.overlap(self.player_1, vodka, null, collectVodka.bind(self, vodka), this);
    });

    this.zoidberg.forEach(function(zoidberg) {
      self.game.physics.arcade.collide(self.player_1, zoidberg, null, touchZoidberg, this);
    });

    var timeRemaining = ((600 - this.timer*15)/1000);

    scoreText.text = 'Time Remaining: ' + timeRemaining; //+ score;

    distance = Math.floor(((SCROLL_SPEED*-0.1) * this.timer)/10000);
    distanceText.text = 'Distance Traveled: ' + distance;

    if (timeRemaining <= 0) {
      scoreText.text = ' ';
      distanceText.text = ' ';
      SCROLL_SPEED = 0;
      this.background.autoScroll(SCROLL_SPEED, 0);
      this.gameOver();
    }
  };

  Shots.Game.prototype.gameOver = function () {
    this.match_state = MATCH.RESOLVED;
    console.log(this.match_state);
    this.game.paused = true;
    this.flash('You Traveled ' + distance, this.enable_restart_game.bind(this));
  };

  Shots.Game.prototype.flash = function(message, cb){

    var text = this.game.add.text(0, 0, message, FLASH_MESSAGE_STYLE);
    text.x = this.game.world.centerX - text.width/2;

    setTimeout(function(){
      text.destroy();
      if(cb) cb();
    }, DEFAULT_FLASH_TIME);
  };

  function collectCoffee (coffee) {
    this.player_1.coffeeCounter++;
    SCROLL_SPEED -= 40;
    this.background.autoScroll(SCROLL_SPEED, 0);
    console.log(SCROLL_SPEED);
    return coffee.kill();
  }

  function collectVodka (vodka) {
    if (this.player_1.coffeeCounter > 11) {
      this.player_1.coffeeCounter -= 10;
    } else {
      this.player_1.coffeeCounter = 0;
    }
    if (SCROLL_SPEED < -240) {
      SCROLL_SPEED += 200;
    } else {
      SCROLL_SPEED = -40;
    }
    this.background.autoScroll(SCROLL_SPEED, 0);
    console.log(SCROLL_SPEED);
    return vodka.kill();
  }

  function touchZoidberg () {
    // this.player_1.body.bounce.setTo(0.5, 0.5);
  }

  Shots.Game.prototype.enable_restart_game = function(){
    this.flash('press [N] to play again');
  };

    // Input actions
  Shots.Game.prototype.continue = function () {

    if(this.match_state === MATCH.RESOLVED){
      console.log('if!');
      this.state.start();
    }
  };

})();
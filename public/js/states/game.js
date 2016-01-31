(function () {


  var INITIAL_POSITIONS = [
    // Player 1
    // where we want player to start on screen
    {x: 100, y: 450},
    // coffee initial position
    {x: 800, y: 150},
    // vodka initial position
    {x: 600, y: 150}
  ];

  var MATCH = {
    PRE : "PRE",
    IN_PROGRESS : "IN_PROGRESS",
    RESOLVED : "RESOLVED"
  };

  // Magic Numbers
  var SCROLL_SPEED = -40;
  var GRAVITY = 1945;

  // Scoreboard
  var score = 0;
  var scoreText;

  Shots.Game = function () {

    this.player_1;
    this.coffee = [];
    this.timer = 0;
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

    // create scoreboard
    scoreText = this.game.add.text(16, 16, 'Coffees Collected: 0', {fontSize: '32px', fill: 'red'});

    this.player_1 = new Shots.Player(this.game, 0, 'teo', fx);
    this.game.add.existing(this.player_1);

    // loads coffee
    this.coffee.push(new Shots.Coffee(this.game, 0));
    // this.coffee = new Shots.Coffee(this.game, 0);
    this.game.add.existing(this.coffee[0]);
    // this.game.add.existing(this.coffee);

    // loads vodka
    this.vodka = new Shots.Vodka(this.game, 0);
    this.game.add.existing(this.vodka);

    // load coffee at quasi-regular intervals


    //position players & items
    this.player_1.x = INITIAL_POSITIONS[0].x;
    this.player_1.y = INITIAL_POSITIONS[0].y;

    this.coffee[0].x = INITIAL_POSITIONS[1].x;
    this.coffee[0].y = INITIAL_POSITIONS[1].y;
    // this.coffee.x = INITIAL_POSITIONS[1].x;
    // this.coffee.y = INITIAL_POSITIONS[1].y;

    this.vodka.x = INITIAL_POSITIONS[2].x;
    this.vodka.y = INITIAL_POSITIONS[2].y;

    // initialize input handler
    this.input = new Shots.GameInput(this);

  };

  Shots.Game.FLOOR_Y = 480;

  Shots.Game.prototype.update = function () {
    console.log(this.timer);
    this.timer++;

    if(this.timer % Math.floor(Math.random() * 300 + 5) === 0){
      var newCoffee = new Shots.Coffee(this.game, 0);
      console.log(newCoffee);
      //randomize where it falls, maybe to right of player.x
      newCoffee.x = INITIAL_POSITIONS[1].x;
      // INITIAL_POSITIONS[1].x += 0;
      //make sure adding and pushing after setting newCoffee
      this.game.add.existing(newCoffee);
      this.coffee.push(newCoffee);
    }

    // Refactor player/item physics
    function objectPhysics (obj, scrollSpeed) {
      if (obj.body.y > Shots.Game.FLOOR_Y){
        obj.body.y = Shots.Game.FLOOR_Y;
        obj.body.velocity.y = 0;
        obj.body.acceleration.y = 0;
      }else{
        obj.body.acceleration.y = GRAVITY;
        obj.body.velocity.x = scrollSpeed;
      }
    }

    this.coffee.forEach(function(coffee){
    objectPhysics(coffee, SCROLL_SPEED);
    });
    objectPhysics(this.vodka, SCROLL_SPEED);



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

    // // gives vodka to vodka
    // [this.vodka].forEach(function(vodka){
    //   // drops vodka to ground
    //   if(vodka.body.y > Shots.Game.FLOOR_Y){
    //     vodka.body.y = Shots.Game.FLOOR_Y;
    //     vodka.body.velocity.y = 0;
    //     vodka.body.acceleration.y = 0;
    //   }else{
    //   vodka.body.acceleration.y = GRAVITY;
    //   vodka.body.velocity.x = -40;
    //   }

    // });

    var self = this;
    this.coffee.forEach(function(coffee){
      self.game.physics.arcade.overlap(self.player_1, coffee, null, collectCoffee.bind(self, coffee), self);
    });
    this.game.physics.arcade.collide(this.player_1, this.vodka);

  };


  function collectCoffee (coffee) {
    this.player_1.coffeeCounter++;
    console.log(this.player_1.coffeeCounter);
    score += 1;
    scoreText.text = 'Coffees Collected: ' + score;
    SCROLL_SPEED -= 40;
    this.background.autoScroll(SCROLL_SPEED, 0);

    // this.game.time.events.repeat(Phaser.Timer.SECOND, 20, resCoffee, this);

    return coffee.kill();
  }

  // function resCoffee () {
  //   var item = this.Coffee.getFirstDead();

  //   if (item) {
  //     item.reset(this.game.world.randomX, this.game.world.randomY);
  //   }
  // }

    // Input actions
  Shots.Game.prototype.continue = function () {
    if(this.match_state === MATCH.RESOLVED){
      this.state.start(Shots.STATES.BOOT);
    }
  };

})();
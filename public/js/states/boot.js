Shots.Boot = function () {

};

Shots.Boot.prototype.preload = function () {
  // will preload all assets
  // using functional and declarative programming, not imperatives!
  // `boot.js` will run functions for every asset declared in `assets.js`
  Shots.game.load.audio('normal-walk', 'assets/audio/normal-walk.mp3');
  Shots.game.load.audio('jump', 'assets/audio/jump.mp3');
  Shots.game.load.audio('zoidberg', 'assets/audio/zoidberg.mp3');
  Shots.game.load.audio('ninja-hit1', 'assets/audio/ninja-hit1.mp3');


  // autoLoad each asset by type
  Object.keys(Shots.ASSETS).forEach(function(type) {
    for (var asset in Shots.ASSETS[type]) {
      Shots.game.load[ type.toLowerCase() ](
        Shots.ASSETS[type][ asset ].name,
        Shots.ASSETS[type][ asset ].path,
        Shots.ASSETS[type][ asset ].width,
        Shots.ASSETS[type][ asset ].height,
        Shots.ASSETS[type][ asset ].frames
      );
    }
  });
};

Shots.Boot.prototype.create = function () {
  // switch to game state (file path)
  this.state.start( Shots.STATES.GAME );
};
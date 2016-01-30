Shots.Boot = function () {

};

Shots.Boot.prototype.preload = function () {
  // will preload all assets
  // using functional and declarative programming, not imperatives!
  // `boot.js` will run functions for every asset declared in `assets.js`

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
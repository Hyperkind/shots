window.Shots = {
  // input static global variables

  ASSETS: {},

  STAGE: {
    WIDTH: 900,
    HEIGHT: 600
  },

  STAGE_ID: 'game', // div in index.html to render this game

  STATES: {
    BOOT: 'Boot',
    GAME: 'Game'
  }
};

// load phaser on window load
// avoid magic numbers: give everything context
window.onload = function () {
  Shots.game = new Phaser.Game( Shots.STAGE.WIDTH, Shots.STAGE.HEIGHT, Phaser.AUTO, Shots.STAGE_ID );
  Shots.game.state.add( Shots.STATES.BOOT, Shots.Boot );
  Shots.game.state.add( Shots.STATES.GAME, Shots.Game );
  Shots.game.state.start(Shots.STATES.BOOT);
};
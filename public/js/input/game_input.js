(function(){

 var BIND = {
    PLAYER : {
        JUMP : Phaser.KeyCode.SPACEBAR,
        LEFT : Phaser.KeyCode.LEFT,
        RIGHT : Phaser.KeyCode.RIGHT
      },

    STATE : {
      CONTINUE : Phaser.KeyCode.N,
    }
  };

  Shots.GameInput = function( state ) {
    this.state = state;

    this.player_1_keys = this.state.game.input.keyboard.addKeys(BIND.PLAYER);
    this.state_keys = this.state.game.input.keyboard.addKeys(BIND.STATE);

    this.player_1_keys.JUMP.onDown.add( this.state.player_1.jump.bind(this.state.player_1) );
    this.player_1_keys.LEFT.onDown.add( this.state.player_1.step_left.bind(this.state.player_1) );
    this.player_1_keys.LEFT.onUp.add( this.state.player_1.stop.bind(this.state.player_1) );
    this.player_1_keys.RIGHT.onDown.add( this.state.player_1.step_right.bind(this.state.player_1) );
    this.player_1_keys.RIGHT.onUp.add( this.state.player_1.stop.bind(this.state.player_1) );

    this.state_keys.CONTINUE.onUp.add( this.state.continue.bind(this.state) );
  };

})();
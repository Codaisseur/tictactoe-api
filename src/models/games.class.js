class GameClass {
  setup(user) {
    this.title = `${user.name}'s Game`;
    this.squares = [
      '', '', '',
      '', '', '',
      '', '', ''
    ];
    this.playerIds = [user._id];
  }
}

module.exports = GameClass;

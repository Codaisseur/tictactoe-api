function randomIndex(max) {
  return Math.floor(Math.random() * max);
}

module.exports = function(hook) {
  if (!hook.id) {
    return hook.app.service('symbols').find()
      .then((result) => {
        const all = result.data.map((symbol) => symbol.symbol);
        return all[randomIndex(all.length - 1)];
      });
  }

  return hook.app.service('games').get(hook.id)
    .then((game) => {
      return hook.app.service('symbols').find({
        query: {
          symbol: {
            $nin: game.playerSymbols
          }
        }
      })
        .then((result) => {
          const all = result.data.map((symbol) => symbol.symbol);
          return all[randomIndex(all.length - 1)];
        });
    });
};

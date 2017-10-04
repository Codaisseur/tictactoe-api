// games-model.js - A mongoose model
const GameClass = require('./games.class');

// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const games = new Schema({
    title: { type: String, required: true },
    squares: [String],
    playerIds: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    playerSymbols: [String], // find by their player index (or turn)
    turn: { type: Number, default: 0 }, // player index
    started: { type: Boolean, default: false },
    winnerId: { type: Schema.Types.ObjectId, ref: 'users' },
    draw: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  games.loadClass(GameClass);

  return mongooseClient.model('games', games);
};

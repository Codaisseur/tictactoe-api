// src/seeds.js
/* eslint-disable no-console */
const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const user = {
  name: 'Game Master',
  email: 'master@codaisseur.com',
  password: 'verysecret'
};

const symbols = '✿★♦✵♣♠♥✖'.split('').map((symbol) => (
  { symbol }
));

// Seed the user and recipe!
const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

feathersClient.service('users').create(user)
  .then(() => {
    feathersClient.authenticate({
      strategy: 'local',
      email: user.email,
      password: user.password
    })
      .then(() => {
        symbols.map((symbol) => {
          feathersClient.service('symbols').create(symbol)
            .then((result) => {
              console.log('Symbol seeded...', result.symbol);
            }).catch((error) => {
              console.error('Error seeding symbol!', error.message);
            });
        });
      })
      .catch(function(error){
        console.error('Error authenticating!', error);
      });
  })
  .catch(function(error) {
    console.error('Error creating user!', error);
  });

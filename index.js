"use strict";

// Helper functions for accessing the mural API. {{clientSecret}}
var Parse = require('parse/node').Parse;

function validateAuthData(authData) {
  return verifyIdToken(authData)
} // Returns a promise that fulfills iff this app id is valid.


function validateAppId() {
  return Promise.resolve();
} // A promisey wrapper for api requests

async function verifyIdToken({ access_token, id }) {
  const data =  await fetch('https://app.mural.co/api/public/v1/users/me', {
    headers: {
      Authorization: 'bearer ' + access_token,
      'User-Agent': 'parse-server'
    }
  });
  
  if (data && data.value && data.value.id == id) {
    return;
  }
  throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Mural auth is invalid for this user.');
}

module.exports = {
  validateAppId: validateAppId,
  validateAuthData: validateAuthData
};
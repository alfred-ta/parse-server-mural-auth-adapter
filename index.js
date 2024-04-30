"use strict";

// Helper functions for accessing the mural API. {{clientSecret}}
var Parse = require('parse/node').Parse;
const axios = require('axios');

function validateAuthData(authData) {
  return verifyIdToken(authData)
} // Returns a promise that fulfills iff this app id is valid.


function validateAppId() {
  return Promise.resolve();
} // A promisey wrapper for api requests

async function verifyIdToken({ accessToken, id, domain }) {
  const muralDomain = domain || 'app.mural.co';
  const url = `https://${muralDomain}/api/public/v1/users/me`;
  try {
    const data = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    console.log('more response data=======', data)
    if (data && data.value && data.value.id == id) {
      return;
    }
    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Mural auth is invalid for this user.');
  } catch(error) {
    console.log('Error in silence', url, error);
    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Mural auth is invalid for this user.');
  }
}

module.exports = {
  validateAppId: validateAppId,
  validateAuthData: validateAuthData
};
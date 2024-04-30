"use strict";

// Helper functions for accessing the mural API. {{clientSecret}}
var Parse = require('parse/node').Parse;
const axios = require('axios');
const MURAL_HOST = 'app.mural.co';

function validateAuthData(authData) {
  return verifyIdToken(authData)
} // Returns a promise that fulfills iff this app id is valid.


function validateAppId() {
  return Promise.resolve();
} // A promisey wrapper for api requests

const prepareAxiosErrorMessage = (error, additionalMessage) =>
  `${error.response.data.error_description || error.message} ${
    additionalMessage ? additionalMessage : ""
  }`;

const muralPublicMe = async (token) => {
  try {
    const res = await axios.get(
      `https://${MURAL_HOST}/api/public/v1/users/me`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return res.data;
  } catch (error) {
    throw new Error(prepareAxiosErrorMessage(error));
  }
};

async function verifyIdToken({ accessToken, id }) {
  try {
    const data = await muralPublicMe(accessToken);
    
    if (data.value.id == id) {
      return;
    }
  } catch(error) {
    console.log('Error in silence', error);
    throw error;
  } finally {
    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Mural auth is invalid for this user.');
  }
}

module.exports = {
  validateAppId: validateAppId,
  validateAuthData: validateAuthData
};
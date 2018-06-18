'use strict';

const express = require('express');
const superagent = require('superagent');

const app = express();

require('dotenv').config();

const GOOGLE_OAUTH_URL = 'https://www.googleapis.com/oauth2/v4/token';
const OPEN_ID_URL = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';


app.get('/oauth/google', (request, response) => {
  console.log('RECEIVING CODE');
  if(!request.query.code) {
    response.redirect(process.env.CLIENT_URL);
  } else {
    console.log('THIS IS THE CODE', request.query.code);

    console.log('SENDING CODE BACK');
    return superagent.post(GOOGLE_OAUTH_URL)
      .type('form')
      .send({
        code: request.query.code,
        grant_type: 'authorization_code',
        client_id: process.env.GOOGLE_OAUTH_ID,
        client_secret: process.env.GOOGLE_OAUTH_SECRET,
        redirect_uri: `${process.env.API_URL}/oauth/google`
      })
      .then(tokenResponse => {
        console.log('ACCESS TOKEN');

        if(!tokenResponse.body.access_token) {
          response.redirect(process.env.CLIENT_URL);
        }
        const accessToken = tokenResponse.body.access_token;

        return superagent.get(OPEN_ID_URL)
          .set('Authorization', `Bearer ${accessToken}`);
      })
      .then((openIDResponse) => {
        console.log(openIDResponse.body);

        response.cookie('THIS IS THE TOKEN');
        response.redirect(process.env.CLIENT_URL);
      })
      .catch(error => {
        console.log(error);
        response.redirect(`${process.env.CLIENT_URL }?error=oauth`);
      });
  }
  return undefined;
});

app.listen(process.env.PORT, () => {
  console.log('SERVER_UP');
});
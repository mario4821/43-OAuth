# Lab 43 OAuth

**Author**: Mario Flores Jr.

**Version**: 1.0.0

## Overview

This app utilizes Google OAuth for quick login and authentication. The front-end is a mock login page with a link that redirects the user to a Google login created just for the specific project.

# Getting Started

Install dependencies referenced in Architecture, in the terminal type:

```npm i -D <dependencies>```

Front End Tab  -
To start up live-server, in the terminal type:

```live-server```

Back End Tab -
To start up Nodemon Server, in the terminal type:

```nodemon```

Add to Back End .env file:
```GOOGLE_OAUTH_ID=<userid>```
```GOOGLE_OAUTH_SECRET=<usersecret>```
```CLIENT_URL=http://localhost:8080```
```API_URL=http://localhost:3000```
```PORT=3000```


## Architecture

JavaScript, babel, dotenv, superagent, express, eslint
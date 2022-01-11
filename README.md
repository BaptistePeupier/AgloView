# Angular Node Heroku
#### Angular UI + Bootstrap + Node/Express API + MySQL Database on Heroku

## Development Environment
Node 17.3.0
npm 8.3.0
Angular CLI 13.0.4
[Heroku](https://www.heroku.com) to run our server

## Heroku Notes
- You will need a (free) [Heroku](https://www.heroku.com) account

## Local Dev Notes
- When running locally, we run the Angular UI on port 4200
- When running locally, we run the Node/Express API on port 8080
- When running on Heroku, the Angular UI and the Node/Express API both run on the same port
- Your UI and API should each auto-restart when code changes are saved

## Initial Setup

**Install Node & NPM**
Download the installer from [Node.js Website](https://nodejs.org/en/). This will install both Node and NPM.

To check your versions:
```sh
node -v
npm -v
```

**Install Angular CLI**
```sh
npm install -g @angular/cli
```
[Angular CLI Website](https://cli.angular.io)

**Run NPM Install on the repo**
```sh
cd my/local/directory
npm install
```

## Create a Heroku App
1. Create a [Heroku](https://www.heroku.com) account
1. Create your a new app on Heroku
1. Link your local repo to Heroku by following the instructions that are presented after you create your app on Heroku:
```bash
$ cd my-project/
$ git init
$ heroku git:remote -a yourherokuappname
```
1. Once your Heroku app is setup and linked, you can deploy your repo to Heroku using `git push heroku master` or `git push heroku mycurrentbranch:master`. You can add the `-f` command to force-push, if needed.

## Running Servers Locally
This boilerplate uses scripts to start the local Angular UI, Node/Express API ...
1. In your Terminal, use `npm run localng` to start the local Angular UI on port 4200
1. In a separate Terminal, use `npm run localapi` to start the local Node/Express API on port 8080

- You should be able to view your Angular UI at `http://localhost:4200`
- You should be able to make a GET request to your Node/Express API at `http://localhost:8080/api/list`

## Development Notes

### Adding new API Endpoint
1. Create a new file, such as `mynewendpoint.js` in the `/api/routes/` directory
1. Add the new route to `server.local.js` and `server.prod.js` like this:
```javascript
app.use(require('./api/routes/mynewendpoint'))
require('./api/routes/mynewendpoint')
```

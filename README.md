# exornation_backend
Exercise project backend example. Implemented using express.js.

## Requirements
- MongoDB (can be free-tier Mongodb Atlas) with its credentials
## How to run
1. Copy `src/config-example.js` to `src/config.js`
2. Edit `uri`, `user`, `pass`, `dbName` in `src/config.js`
3. Run `npm install`
4. Run `npm run watch`

## Note
`src/config.js` will contains your mongodb database credentials (user, pass). Be careful and do not add/commit/push this file to your GitHub. 

Add     "rewrites": [{ "source": "/(.*)", "destination": "/api" }] to json file
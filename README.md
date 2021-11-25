# Parse-server-mural-auth-adapter
Authenticate to parse server with your Mural account

## How to use it?
### 1) Install the module
```js
yarn add parse-server-mural-auth-adapter
```
### 2) Add this module when creating `ParseServer`
```js
import { ParseServer } from 'parse-server'
import muralAuthAdapter from 'parse-server-mural-auth-adapter'
...
const parserServer = new ParseServer({
  ...
  auth: {
    mural: muralAuthAdapter
  }
})
```
### 4) Using Mural access token in our project
* Get Parse access token by POST a raw data to `/parse/users`
```sh
curl -X POST \
  {{host}}/parse/users \
  -H 'content-type: application/json' \
  -H 'x-parse-application-id: {{ParseAppId}}' \
  -d '{
    "authData": {
    	"mural": {
    		"access_token": "{{access_token}}",
    		"id": "{{MuralUID}}"
    	}
    }
}'
```

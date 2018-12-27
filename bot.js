/* first, on the terminal:
	npm init
	npm install mastodon-api
*/

const config = require('./config');
const Mastodon = require('mastodon-api');

console.log("mastodon bot starting");

const M = new Mastodon({
    access_token: config.myAccessToken,
    timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
    api_url: 'https://botsin.space/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
});

const params = {
    status: "just setting up my mstdn :P"
}

M.post('statuses', params, (error,data) => {
    if (error) {
        console.error(error);
    } else {
        console.log(data);
    }
});

console.log("mastodon bot finished.");
/* first, on the terminal:
	npm init
	npm install mastodon-api
*/

const config = require('./config');
const Mastodon = require('mastodon-api');
//const file = require('fs');
const feedData = require('./feed1.json');

console.log("mastodon bot starting");

const M = new Mastodon({
    access_token: config.myAccessToken,
    timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
    api_url: 'https://botsin.space/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
});

toot();
setInterval(toot, 5000);

function toot() {
    const params = {
        status: `\n#np #nowplaying`
    }

    M.post('statuses', params, (error,data) => {
        if (error) {
            console.error(error);
        } else {
            //fs.writeFileSync('feed1.json',JSON.stringify(data, null, 2))
            //console.log(data);
            console.log(`successfully tooted at ${data.created_at}: ${data.url}`);
            console.log(data.content);
        }
    });
}

console.log("mastodon bot finished.");
/* first, on the terminal:
	npm init
	npm install mastodon-api
*/

const config = require('./config');
const Mastodon = require('mastodon-api');
const fs = require('fs');

console.log("mastodon bot starting");

const M = new Mastodon({
    access_token: config.myAccessToken,
    timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
    api_url: 'https://botsin.space/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
});

var feedData = JSON.parse( fs.readFileSync('./feed1.json') );
for(var i=0; i<3; i++){ //TODO: feedData.length
    toot(feedData[i]);
    //setInterval( toot(feedData[i]), 5000 ); //FIXME: how to wait here?
}

function toot(data) {
    return function() {
        const params = {
            status: `${data.song}, by ${data.artist} \n♪ ♫ ♬\n#np #nowPlaying #inFact #2yearsAgo_playing`
        }

        M.post('statuses', params, (error,result) => {
            if (error) {
                console.error(error);
            } else {
                console.log(`successfully tooted at ${result.created_at}: ${result.url}`);
                console.log(result.content);
            }
        });
    }
}

console.log("mastodon bot finished.");

/* WORKING AT NOW:

var feedData = JSON.parse( fs.readFileSync('./feed1.json') );
for(var i=0; i<3; i++){ //TODO: feedData.length
    toot(feedData[i]);
}

function toot(data) {
    const params = {
        status: `${data.song}, by ${data.artist} \n♪ ♫ ♬\n#np #nowPlaying #inFact #2yearsAgo_playing`
    }

    M.post('statuses', params, (error,result) => { //FIXME: sync - await ?
        if (error) {
            console.error(error);
        } else {
            console.log(`successfully tooted at ${result.created_at}: ${result.url}`);
            console.log(result.content);
        }
    });
}

*/

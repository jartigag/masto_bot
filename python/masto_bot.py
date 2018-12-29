#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# just a mastodon bot (at the moment)
#
# usage: python3 masto_bot.py

__author__ = "@jartigag"
__version__ = "0.1"

import json
from collections import OrderedDict
from mastodon import Mastodon
from secrets import access_token
from time import sleep

feedData = json.load(open('../feed1.json'),object_pairs_hook=OrderedDict)

mastodon = Mastodon( access_token=access_token, api_base_url='https://botsin.space')

for d in feedData:
	try:
		toot = mastodon.toot( '{}, by {} \n♪ ♫ ♬\n#np #nowPlaying #inFact #2yearsAgo_playing'.format(d['song'],d['artist']) )
		print( 'successfully tooted at {}: {}'.format(toot.created_at,toot.url) );
		sleep(2)
	except Exception as e:
		print("[\033[91m!\033[0m] error: %s" % e)

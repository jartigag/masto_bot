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
from datetime import datetime, timedelta

feedData = json.load(
	open('../feed2.json'),object_pairs_hook=OrderedDict
)[::-1] #reverse json list

mastodon = Mastodon( access_token=access_token, api_base_url='https://botsin.space')

i=0
while i<len(feedData):
	d = feedData[i]
	now = datetime.now()
	nextDatetime = datetime.strptime(d['datetime'],'%d %b %Y %H:%M')
	#print(d['song'],'\nnextDatetime:',nextDatetime,'\nnow-timedelta(days=365*2):',(now-timedelta(days=365*2)).strftime('%Y-%m-%d %H:%M:%S')) #DEBUGGING
	if int(now.strftime('%M'))%15==0:
		#print time at 0,15,30,45
		print(now.strftime('%Y-%m-%d %H:%M:%S'))
	if (now-timedelta(days=365*2)) > nextDatetime:
		try:
			toot = mastodon.toot( '{}, by {} \n♪ ♫ ♬\n#np #nowPlaying #inFact #2yearsAgo_playing'.format(d['song'],d['artist']) )
			print( '\nsuccessfully tooted at {}: {}'.format(toot.created_at.strftime('%Y-%m-%d %H:%M:%S'),toot.url) );
			i+=1
		except Exception as e:
			print("\n[\033[91m!\033[0m] error: %s" % e)
	else:
		print('.', end='',flush=True)
	sleep(60)
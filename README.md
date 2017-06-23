# streamvid
videos for streamers, hype from your pi

put webms you want into `/media`.

change `media.json`, for example

```js
{
  "mywebm": "media/video.webm"
}
```

install dependencies

`$ npm install`

then run using `$ node app`

now open `http://localhost:3000" in your browser.

now hit `http://localhost:3000/add/mywebm` in another browser tab. the main browser tab will play
your video! if your webm has audio it will play this also. you can hit that url multiple times and it will
queue the video.

# next

this is just a proof of concept, it's possible ill continue developing for my own use. what i will definitely add is a
`/skip` endpoint that will skip the current playing video to the next.

another idea is another www/ page for mobiles to run. so that way all you need is a browser. just tap on a button, loaded from `media.json`,
and wowee off it goes.

# purpose

the purpose was the fact that not everyone has computers that are powerful enough to run videos for hype when something
happens (see twitch.tv/bajostream for what i mean, he plays 30s-1min videos for donations and such). this offloads the video
overhead to your pi (or other computer, whatever) and lets your main computer handle the stream.

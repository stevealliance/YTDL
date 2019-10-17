# Objective of the application:

- Download videos from youtube from the link
- Create 3 thumbnails, one from the beginning of the video, another from the middle and another from the end in HD
- Save the video in mp4 format.
- Be able to access them through a url.

## Technology used:

- Node.js with express.js
- Ffmpeg (to manipulate the video and extract the thumbs)
- YTDL (to download the YouTube video)
- Socket.IO (to know the live video upload status)
- React.js with Next.js (applying SSR)
- Redux with Redux-starter-kit (already includes redux-thunk)
- UI material

## Instructions to run the application:

### local:

First download Ffmpeg from:
https://www.ffmpeg.org/

```
$ git clone https://github.com/edlugora96/YTDL

cd YTDL
// Dev
npm run dev

// Production
npm run start
```

### Heroku

To deploy in Heroku you have to add the ffmpeg buildpack:

```
heroku buildpacks: add https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git -a HERE_YOUR_APP
```

##To do list:

- Organize the index.js page in components
- Add error handling to the form
- Get videos with higher resolution
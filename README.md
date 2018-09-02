<div align="center">
    <h1>RSS in Discord</h1>
    RSS in Discord is a project aimed at making RSS easier to consume by using Discord to display the content of a feed.
</div>

<h2 align="center">Installation</h2>

This project uses Docker and docker-compose to streamline the build process. You can find instructions on how to install both of these from the docker website, or click <a href="https://docs.docker.com/compose/gettingstarted/">here</a>.

You will need to rename `.bot-env-sample` to `.bot-env` and place your discord bot token in it.

Run `docker-compose build` to create the containers and install the project to them.

Run `docker-compose up` to start up the containers and run the program.

Authorize the Bot on your Discord server by visiting (replace APP_ID with your bots ID):
https://discordapp.com/oauth2/authorize?client_id=APP_ID&scope=bot

<h2 align="center">Introduction</h2>
Google Reader was retired July 1, 2013. I had been using it extensively to read news articles, web comics and technical content I enjoyed on a daily basis. I'd known about RSS before Reader was released but Reader made it both accessible and easy to use.

This project was born out of a desire to get a more Reader like experience from RSS.

While the ability to search for new feeds may be beyond the scope of what's reasonable for this project. I hope that the ability to easily add new feeds and read them in Discord is able to bring back a semblance of the original Reader experience.

<h2 align="center">Using</h2>

You can add feeds to your Discord server using either the <a>RnD Website</a> or by typing the command directly into Discord.

<h2 align="center">Commands</h2>

- `!sub [feed]`
- `!unsub [feed]`
- `!settings`
- `!help`

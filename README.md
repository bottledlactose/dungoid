# Dungoid

A general-purpose roleplaying Discord bot featuring useful commands such as `/roll` and character/alias creation commands.

This repository is **closed source** meaning it may not be distributed in any way.

## Getting Started

Dungoid is using Node.js and JavaScript to do its work. This bot was tested on at least Node.js version **19.6.0** and up to **20.0.0**. You need to register a [Discord application](https://discord.com/developers/applications) to obtain a token for use in the `config.json` file which you must copy from `config.example.json`:
```
cp config.example.json config.json
```
You should then fill in the `token` and `clientId` properties specific to the application you created.

### Development

To set up the bot from your local working environment you can use the `npm run dev` command to start up Nodemon, a tool that automatically reloads your program on code changes.

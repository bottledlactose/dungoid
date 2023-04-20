<p align="center">
  <img src="https://raw.githubusercontent.com/bottledlactose/dungoid/trunk/assets/avatar.png?token=GHSAT0AAAAAACA5YYHRRS2JQXT4V77N5ONUZCBEI6A" alt="icon" />
</p>

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

### Scripts

The repository comes with some build-in scripts to make things easier. These scripts can be run from NPM:

- `npm run dev` - Starts up Nodemon, enabling automatic application reloads on file save
- `npm run deploy` - Deploys all commands in `commands` to all guilds the application is in

## Project Structure

The project structure of Dungoid is fairly simple:

- `assets` - Contains static assets for various purposes, e.g. display in the README file
- `commands` - Contains all command-specific files, e.g. `/invite` has a file called `invite.js`
- `modules` - Contains small modules of re-usable code, e.g. `embed.js` is named `embedModule` in-code
- `scripts` - Contains scripts that automate some tasks, e.g. `deploy.js` which is called by `npm run deploy` to update application commands

You will notice there is both a `index.js` and `bot.js` file. This is because Dungoid uses interal sharding to future-proof itself for more users. `bot.js` contains the actual bot while `index.js` contains the sharding management.

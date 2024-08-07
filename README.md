**NOTE:** This project is no longer maintained due to a major bug with the SQLite library, essentially wiping everyone's data every now and then for some unexplainable reason.

<p align="center">
  <img src="https://raw.githubusercontent.com/bottledlactose/dungoid/trunk/assets/icon.png" alt="icon" />
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

**NOTE:** `nodemon` has been temporarily disabled due to a security vulnerability with `semver` ([CVE-2022-25883](https://nvd.nist.gov/vuln/detail/CVE-2022-25883))

## Project Structure

The project structure of Dungoid is fairly simple:

- `assets` - Contains static assets for various purposes, e.g. display in the README file
- `commands` - Contains all command-specific files, e.g. `/invite` has a file called `invite.js`
- `migrations` - Contains data migrations that should be manually executed when the dataset changes
- `modules` - Contains small modules of re-usable code, e.g. `embed.js` is named `embedModule` in-code
- `scripts` - Contains scripts that automate some tasks, e.g. `deploy.js` which is called by `npm run deploy` to update application commands

You will notice there is both a `index.js` and `bot.js` file. This is because Dungoid uses interal sharding to future-proof itself for more users. `bot.js` contains the actual bot while `index.js` contains the sharding management.

## Links

- [top.gg](https://top.gg/bot/1097514094434713711)
- [Discord invite](https://discord.com/oauth2/authorize?client_id=1097514094434713711&permissions=536870912&scope=bot%20applications.commands)

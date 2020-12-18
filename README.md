# Admin-O-Bot
(C) Mikdore 2020

## A general purpose discord bot
This bot serves no one particular purpose, it has several modules,
each doing something different. The mission of the bot is to one day be a do-all, no more having 15 different bots. But that's a long road

## Running the bot
The bot uses enviromental variables for credentials. 
Here is the script I use to compile and run it. 
It uses MariaDB as a database 
(Note: *the tables in the DB are subject to change as of now*)
```bash
export TOKEN=''

export DB_PASS=''
export DB_USER=''
export DB_HOST=''
export DB_ENCR=''   
export DB_CERT=''   # optional

npm run build       # build
cp -r config build  # copy the config.json
npm run start       # run the compiled output
```

## Contributing
This bot is my personal project, I may some day decide to monetize. 
As such I want, but more importantly *need* to keep the copyright to
this whole project. If you are interested in contributing, you will 
need to agree to a Copyright Transfer Agreement. If you interested 
in becoming a contributor contact me. Feel free to open issues at 
any time.

## About the code
Yes - the module system is messy, but it's not *the* worst - and - so far - it works.

## Licensing
The code hosted here is available under the AGPL - 
which is pretty restrictive for an Open Source license.
While I agree it sucks for libraries,
this is essentially a whole product.
If you are interested in using this in a commercial setting contact me.

## Contact 
Add me on discord `mikdore#8215` or email `admin@mikadore.eu` 

I'm also available for private developement and/or
consultation especially in regards to this bot

## List of features & TODO
Submit an issue for feature requests or contact me for more
elaborate stuff.
- Administration
  - [x] Ban Command
  - [x] Kick Command
  - [x] Kick Invite Command
  - [ ] Cleaning messages
  - [ ] Role Management
  - [ ] Removing channels
  - [ ] Nicknaming

- Utility
    - [x] Content Command
    - [x] Help Command
    - [x] Info command
    - [ ] config command

- Tickets
  - [ ] Ticket Command
  - [ ] Database integration 

- Database integration
  - [x] Connecting with credentials  

 
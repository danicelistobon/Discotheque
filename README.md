# :tada: Discotheque

<img align="center" src="https://i.imgur.com/eX0bIIV.gif" width="100%"/>

Discotheque is a web application that connects the client to the different places that he could go, according to his tastes. The app has a search engine that orders the clubs by category (disco, fonda, bar, etc), by musical genres, location, popularity, type of audience, etc. In addition, the client can follow the clubs that he likes the most and can receive notifications of upcoming events that will take place there and do his respective reservations.

For the front end, I chose to use HTML5, CSS3 and the Muuri library, which is in charge of running the search engine and the categories, it uses the data attributes to make the filters using a script. For the back end, I used the Express framework, Nodemon for the development, Passport for the login validation process, Bcrypt to encrypt the passwords before they are saved, MySQL for the database. For front and back integration I use the Handlebars template engine.

## Prerequisites
To run Discotheque on dev mode, you must have:
- NodeJS
- npm
- MySQL
- Express
- Handlebars
- Morgan
- Bcryptjs
- Passport

To install NodeJs 10:
```
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

To install MySQL 5.7:
```
$ echo 'deb http://repo.mysql.com/apt/ubuntu/ trusty mysql-5.7-dmr' | sudo tee -a /etc/apt/sources.list
$ sudo apt-get update
$ sudo apt-get install mysql-server-5.7
```

To install the other libraries and frameworks:
```
$ npm i express express-handlebars express-session mysql express-mysql-session morgan bcryptjs passport passport-local timeago.js connect-flash express-validator
```

## Installation
- Clone this repository in your terminal: `git clone https://github.com/danicelistobon/Discotheque`
- Access Discotheque directory: `cd Discotheque`
- Run database configuration in MySQL: `./database/db.sql` (note: this file has the configuration)
- Restore the database backup: `mysql -h localhost -u disco_dev -p disco_dev_db < ./discoDB.sql`
- Run the app locally: `npm run dev`
- Type in the browser: `http://localhost:4000/`

<img align="center" src="https://i.imgur.com/5M0n3eH.jpg" width="100%"/>

## Content
| Files & dirs | Description |
| ------ | ------ |
| database/db.sql | contains a copy to create the database, the user and the tables |
| src/lib/handlebars.js | contains the helpers for the template engine |
| src/public/images/ | contains the images used in the template |
| src/public/js/ | contains the script that handles the search filter and the categories |
| src/public/styles/ | contains all the style sheets used in the template |
| src/routes/ | contains all API routes |
| src/views/ | contains all views rendered using handlebars |
| src/database.js | contains the script to connect to the database |
| src/index.js | contains the configuration of the app |
| src/keys.js | contains info from the database |
| package.json | contains the name of the project, the version, the dependencies, etc |
| discoDB.sql | contains the database backup |
| server-nginx_config | contains the server configuration |

## :octocat: Author
Daniel Celis Tobon [Github](https://github.com/danicelistobon) | [Twitter](https://twitter.com/danicelistobon)

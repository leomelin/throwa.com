Throwa.com
==============

An open source filesharing platform with easy RESTful usage & public API.
[www.throwa.com](http://www.throwa.com)

Installation
------------
1. Clone the repo
2. Install and start mongodb server - Migrate foldername data to your mongoDB database
  ```sh
$ mongorestore --db <YOUR DB NAME> --collection folderwords mongodb-migrations/folderwords.bson
```
3. Update config.js to match your local settings
4. Start development server

```sh
$ bower install
$ npm install
$ gulp
```

To create a production build run ```gulp release``` and the build will be generated into ```/build/release``` folder.

Licence MIT

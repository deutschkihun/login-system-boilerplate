# LoginSystem Boilerplate

> Design of a generic login boilplate that can be used every application which needs login system.

## Demonstration

https://login-boilerplate-deutschkihun.herokuapp.com/

## How to start this project

1. Clone project (ssh)

```bash
$ git clone git@github.com:deutschkihun/Login-Boilerplate.git
```

2. Install dependency files in your local machine

```bash
* server

$ npm i
```

```bash
* client

$ cd client
$ npm i
```

3. Connect with MongoDB

> For user to use this application, make sure that the mongodb connection is succeed. In folder "server-> config" make a new file "dev.ts".

```bash
module.exports = {
  mongoURI: 'mongodb+srv://<username>:<password>@kihun.fnvav.mongodb.net/<dbname>?retryWrites=true&w=majority'
}
```

4. Fill your username and password on your cluster(mongodb database).
   > Please notice that this information is not your login data of MongoDB webpage. Remove "<" and ">" when you insert your username and password.

> Your can find your dbname in "Browser Collection"

> MongoDB doesn't allow to have a unescaped characters in password such as question mark or exclamation mark. Otherwise connection will be rejected.

> if you don't have database, username, and password in MongoDB, then go to mongodb webpage and login first [here](https://account.mongodb.com/account/login).

5. Set proxy for cors issue

> There is file called setupProxy. Find this file and set a hostname and port for server in local machine. 

6. Run project

```bash
$ npm run dev
```

> If it working properly, you can acces to localhost:3000 and in terminal you can see "MongoDB is connected"


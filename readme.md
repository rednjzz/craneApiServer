# Crane rigging Api Server

### 0. Before Start

```terminal

  $>mkdir config
  $>cd config
  $>touch config.json
  add under the text in config.json
    {
      "development": {
        "username": "root",
        "password": [password],
        "database": "miniproject",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "operatorsAliases": false
      },
    }
  $>touch .env
    PORT=9001
    NODE_ENV=development
    JWT_SECRET=craneApiServerSecrete
```
### 1. Start
```terminal
   $>npm start
  
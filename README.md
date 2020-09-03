<h1 align="center">App Notes API</h1>

<p align="center">
  Example NodeJS API using Knex.js Query Builder
</p>

## :rocket: Technologies

This project was developed with the following technologies:

- [Node.js][nodejs]
- [Express]
- [Docker]
- [Knex.JS]
- [PostgreSQL][postgre]
- [Bcrypt.js][bcryptjs]
- [JWT]
- [Nodemon]
- [Git]
- [VS Code][vscode]
- [ESlint][lint]
- [Prettier - Code formatter][prettier]

## :floppy_disk: Setup Database

**PostgreSQL**

```bash
# Install PostgreSQL with Docker
docker run --name notes-api -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

**Knex.JS Example**

```bash
# Example migration
yarn knex --knexfile src/config/knexfile.js migrate:make create_table_users

yarn knex --knexfile src/config/knexfile.js migrate:latest

# Example migration rollback
yarn knex --knexfile src/config/knexfile.js migrate:rollback

yarn knex --knexfile src/config/knexfile.js migrate:rollback --all

# Example seeds
yarn knex --knexfile src/config/knexfile.js seed:make 001_users

yarn knex --knexfile src/config/knexfile.js seed:run --specific 001_users.js

```

---

:heart: by [**Dailton Bastos**][linkedin]

[nodejs]: https://nodejs.org/en/
[express]: https://www.npmjs.com/package/express
[docker]: https://www.docker.com/
[bcryptjs]: https://www.npmjs.com/package/bcryptjs
[postgre]: https://www.postgresql.org/
[knex.js]: http://knexjs.org/
[nodemon]: https://www.npmjs.com/package/nodemon
[jwt]: https://jwt.io/
[vscode]: https://code.visualstudio.com/
[lint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[git]: https://git-scm.com/
[linkedin]: https://www.linkedin.com/in/dailton-bastos/

## Uses

-   express
-   typescript
-   sequelize

## Commands

-   run server : yarn run dev
-   run migrations : yarn migrate
-   create migration : ./node_modules/.bin/sequelize migration:generate --name=<migration-name>

## Getting Started

Install yarn:

```js
npm install -g yarn
```

Install dependencies:

```sh
yarn
```

Set environment (vars):

```sh
cp .env.example .env
```


## API Naming Convention
1. Create 
   /item

2. List All Items
   /items

3. Find One Item
   /item/:itemId

4. Update
   /update-item/:itemId

## Controller Naming Convention
1. **Create** - to create new record
2. **List** - fetch all records
3. **List for (role)** - to fetch based on role
4. **Find By (attribute)** - to fetching by filtering
'use strict';

import _ from 'lodash';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
import config from './config';

const db = {};

// connect to postgres db
const sequelize = new Sequelize(
  config.postgres.db,
  config.postgres.user,
  config.postgres.password,
  {
    logging: false,
    dialect: 'postgres',
    port: config.postgres.port,
    host: config.postgres.host,
    define: {
      freezeTableName: true,
    }
  },
);
const modelsDir = path.normalize(`${__dirname}/../src/models`);

fs
  .readdirSync(modelsDir)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && ((file.slice(-3) === '.ts') || (file.slice(-3) === '.js'));
  })
  .forEach(file => {
    console.info(`Loading model file ${file}`);
    const model = require(path.join(modelsDir, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

// export default {
//   db,
// };


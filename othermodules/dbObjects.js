const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const scourge = require('./models/scourge')(sequelize, Sequelize.DataTypes);
const users = require('./models/users')(sequelize, Sequelize.DataTypes);
const scourgeAssignment = require('./models/scourgeAssignment')(sequelize, Sequelize.DataTypes);

scourgeAssignment.belongsTo(scourge, { foreignKey: 'scourge_id', as: 'scourgeName' });

Reflect.defineProperty(users.prototype, 'addScourge', {
    value: async function addScourge(scourgeName) {
        const userScourge = await scourgeAssignment.findOne({
            where: {  user_id: this.user_id, scourge_id: scourgeName.id  },
        });

        if(scourgeAssignment){
            scourgeAssignment.scourge_id += 1;
            return scourgeAssignment.save();
        }

        return scourgeAssignment.create({  user_id: this.user_id, scourge_id: scourgeName.id});
    }
});

Reflect.defineProperty(users.prototype, 'getScourge', {
    value: function getScourge() {
        return scourgeAssignment.findAll({
            where: {  user_id: this.user_id  },
            include: ['scourgeName'],
        });
    }
});

module.exports = { users, scourgeAssignment, scourge };
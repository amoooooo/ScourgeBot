const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
});

const scourge = require('./models/scourge.js')(sequelize, Sequelize.DataTypes);
require('./models/users.js');
require('./models/scourgeAssignment.js');

const force = process.argv.includes('--force') || process.argv.includes('--f');

sequelize.sync({  force  }).then(async () => {
    const scourges = [
        scourge.upsert({ name: 'Nol',  scourge_id: '0', description: 'test', weaknesses: 'water', strengths: 'distance', personality: 'garbage'}),
    ];

    await Promise.all(scourges);
    console.log('Database sync completed');

    await sequelize.close();
}).catch(console.error);
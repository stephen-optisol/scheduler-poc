const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'sqlite-example-database/example-db.sqlite',
	logQueryParameters: true,
	benchmark: true
});

const modelDefiners = [
	require('./models/parent.model'),
	require('./models/shift.model'),
	require('./models/staff.model'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;

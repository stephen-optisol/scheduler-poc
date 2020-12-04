const sequelize = require("../sequelize");

async function reset() {
	console.log(
		"Will rewrite the SQLite example database, adding some dummy data."
	);

	await sequelize.sync({ force: true });

	await sequelize.models.staff.bulkCreate([{ username: "jack-sparrow" }]);
}
reset();

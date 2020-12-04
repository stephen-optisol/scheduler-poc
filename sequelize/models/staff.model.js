const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('staff', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		username: {
			type: DataTypes.STRING,
		},
	});
};

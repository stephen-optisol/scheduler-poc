const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('shift', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		index: {
			type: DataTypes.INTEGER
		}
	});
};

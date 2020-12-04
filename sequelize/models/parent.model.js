const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("parent", {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		type: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		startDate: {
			type: DataTypes.DATE,
		},
		endDate: {
			type: DataTypes.DATE,
		},
		uniqueId: {
			type: DataTypes.STRING,
		},
		startTime: {
			type: DataTypes.STRING,
		},
		endTime: {
			type: DataTypes.STRING,
		},
		staffCount: {
			type: DataTypes.NUMBER,
		},
		weekDays: {
			type: DataTypes.STRING,
		},
		staffIndex: {
			type: DataTypes.NUMBER,
			defaultValue: -1,
		},
		workDate: {
			type: DataTypes.STRING,
		},
	});
};

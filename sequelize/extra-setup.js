function applyExtraSetup(sequelize) {
	const { shift, parent, staff } = sequelize.models;
	shift.belongsToMany(parent, { through: "parentShift" });
	parent.belongsToMany(shift, { through: "parentShift" });
	staff.hasMany(shift);
	shift.belongsTo(staff);
}

module.exports = { applyExtraSetup };

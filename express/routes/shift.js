const { models, model } = require("../../sequelize");
const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
const { nanoid } = require("nanoid");

module.exports = {
	async createShift(req, res) {
		console.log(await models.parent.findAll());
		const params = {
			type: "permanent",
			startDate: moment().format(),
			endDate: moment().add(6, "months").format(),
			startTime: "10:00",
			endTime: "15:00",
			uniqueId: nanoid(),
			staffCount: 10,
			weekDays: [2, 4, 6].join(","),
		};
		const parent = await models.parent.create(params);
		res.status(201).json({ message: "Hello", parent });
	},

	async getAllShift(req, res) {
		let parents = await models.parent.findAll({
			attributes: [
				"id",
				"type",
				"startDate",
				"endDate",
				"startTime",
				"endTime",
				"staffCount",
				"weekDays",
				"workDate",
				"staffIndex",
				"uniqueId",
			],
			include: {
				association: "shifts",
				through: {
					attributes: [],
				},
				include: {
					association: "staff",
				},
			},
		});
		let daysArray = [];
		parents.forEach((parent) => {
			const parentObj = parent.dataValues;
			const shifts = parentObj.shifts;
			delete parentObj.shifts;
			const range = moment.range(parentObj.startDate, parentObj.endDate);
			let days = Array.from(range.by("day"));
			if (parentObj.workDate) {
				days = [moment(parentObj.workDate).startOf("day")];
			}
			const weekDays = parentObj.weekDays;
			delete parentObj.weekDays;
			const updatedObj = days
				.map((m) => {
					if (weekDays.split(",").includes(String(m.isoWeekday()))) {
						const weekDay = m.isoWeekday();
						return {
							[m.format("YYYY-MM-DD")]: Array.from(
								{ length: parentObj.staffCount },
								(v, i) => {
									const shiftArr = shifts.filter((shift) => shift.index === i);
									return { ...parentObj, shifts: shiftArr, index: i, weekDay };
								}
							),
						};
					}
					return false;
				})
				.filter(Boolean);
			daysArray.push(updatedObj.flat());
		});
		res.status(200).json({ message: "Hello", daysArray });
	},

	async editShift(req, res) {
		const { index, uniqueId, workDate, startTime, endTime } = req.body;
		const parent = await models.parent.findOne({ where: { uniqueId } });
		const dupParent = JSON.parse(JSON.stringify(parent));
		dupParent.staffIndex = index;
		dupParent.workDate = moment(workDate).format("YYYY-MM-DD");
		dupParent.startTime = startTime;
		dupParent.endTime = endTime;
		delete dupParent.id;
		const updatedParent = await models.parent.create(dupParent);
		res.status(200).json({ message: "Success", updatedParent });
	},

	async assignStaff(req, res) {
		const { index, uniqueId, workDate, staffId } = req.body;
		const parent = await models.parent.findOne({
			where: { uniqueId, workDate },
		});
		const parentShift = await parent.createShift({ index, staffId });
		res.status(200).json({ message: "Success", shift: parentShift.shift });
	},
};

class Memory {
	constructor() {
		this.db = require("lowdb")(new (require("lowdb/adapters/FileSync"))("db.json"));
		this.db.defaults({ trainingData: [], net: null }).write();
	}
	addTrainingData(input, output) {
		if (this.db.get("trainingData").find({ input, output }).value() !== { input, output }) {
			return this.db.get("trainingData").push({ input, output }).write();
		} else {
			return false;
		}
	}

	getTrainingData() {
		return this.db.get("trainingData").value();
	}

	saveNet(data) {
		this.db.set("net", data).write();
	}

	readNet() {
		return this.db.get("net").value();
	}

}
module.exports = Memory;
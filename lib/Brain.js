class Brain {
	constructor() {
		this.Memory = new (require("./Memory"))();
		this.lstm = new (require("brain.js").recurrent.LSTM)();
		this.debugTrain = require("debug")("brain:train");
		this.debugRun = require("debug")("brain:run");
		console.log(this.Memory.readNet());
		if (this.Memory.readNet() !== null) {
			this.lstm.fromJSON(this.Memory.readNet());
		} else {
			this.Memory.addTrainingData("hey", "hello");
			this.Memory.addTrainingData("hello", "hey");
			this.train();
		}
	}

	train() {
		this.debugTrain("{START}");
		this.lstm.train(this.Memory.getTrainingData(), {
			logPeriod: 100,
			log: this.debugTrain,
			errorThresh: 0.01,
			iterations: 1500
		});
		// this.debugRun("{SAVE_NET}", this.lstm.toJSON());
		this.Memory.saveNet(this.lstm.toJSON());
	}

	run(data) {
		let output = this.lstm.run(data);
		this.debugRun(data, output);
		return output;
	}

}

module.exports = Brain;
module.exports = class Events {

	constructor(client) {
		this.client = client;

		this.name = String;
	}

	async run() {
		throw new TypeError(`There are no execution methods to run the event ${this.name}`);
	}

};

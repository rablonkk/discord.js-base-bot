module.exports = class Commands {

	constructor(client) {
		this.client = client;

		this.name = String;
		this.description = String;
		this.options = Array;

		this.category = String;

		this.enabled = Boolean;
		this.ignoreSlash = Boolean;
	}

	async run() {
		throw new TypeError(`There are no execution methods to run the command ${this.name}`);
	}

};

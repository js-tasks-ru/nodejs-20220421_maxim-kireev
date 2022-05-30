class LimitExceededError extends Error {
	constructor() {
		super("Limit has been exceeded.");
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
		this.status = 404;
		this.code = "LIMIT_EXCEEDED";
	}
}

module.exports = LimitExceededError;

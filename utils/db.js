const mongoose = require('mongoose');

exports.connect = () => {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(process.env.MONGO_URL)
			.then(() => {
				resolve();
			})
			.catch(reject);
	});
};

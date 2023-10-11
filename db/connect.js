const mongoose = require("mongoose");
async function connect(url) {
	try {
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connect Successfully !!");
	} catch (error) {
		console.log(error);
	}
}

module.exports = connect;

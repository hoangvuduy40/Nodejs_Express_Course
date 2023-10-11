const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			require: [true, "user name must be provided"],
		},
		password: {
			type: String,
			require: [true, "password must be provided"],
			validate: {
				validator: function (pass) {
					return pass.length > 6;
				},
				message: (props) => "password is enough characters long!",
			},
		},
		fullName: {
			type: String,
			require: [true, "full name must be provided"],
		},
		birthday: {
			type: Date,
			require: [true, "birthday must be provided"],
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("users", UserSchema);

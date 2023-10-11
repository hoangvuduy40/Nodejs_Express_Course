// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

const jwt = require("jsonwebtoken");
const { BadRequestError, CustomAPIError } = require("../errors");
const UserSchema = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { use } = require("express/lib/router");

const register = async (req, res, next) => {
	const userBody = req.body;

	const createUser = await UserSchema.create({
		...userBody,
		birthday: new Date(userBody.birthday),
	});
	const token = jwt.sign(
		{ id: createUser.id, userName: createUser.userName },
		process.env.JWT_SECRET,
		{
			expiresIn: "30d",
		},
	);

	const user = {
		userName: createUser.userName,
		birthday: createUser.userName,
		fullName: createUser.fullName,
		token,
	};

	res.status(StatusCodes.CREATED).json({ msg: "user created", user });
};

const login = async (req, res) => {
	const { userName, password } = req.body;

	console.log(userName, password);

	// mongoose validation
	// Joi
	// check in the controller

	if (!userName || !password) {
		throw new BadRequestError("Please provide email and password");
	}

	//just for demo, normally provided by DB!!!!
	const user = await UserSchema.findOne({ userName });

	if (!user) {
		throw new UnauthenticatedError("Invalid Credentials");
	}

	// try to keep payload small, better experience for user
	// just for demo, in production use long, complex and unguessable string value!!!!!!!!!
	const token = jwt.sign(
		{ id: user.id, username: user.userName },
		process.env.JWT_SECRET,
		{
			expiresIn: "30d",
		},
	);

	res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
	const luckyNumber = Math.floor(Math.random() * 100);

	res.status(200).json({
		msg: `Hello, ${req.user.username}`,
		secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
	});
};

module.exports = {
	login,
	dashboard,
	register,
};

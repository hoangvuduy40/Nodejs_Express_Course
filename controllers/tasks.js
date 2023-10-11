const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
	const params = req.query;
	console.log(params);
	const task = await Task.find({});
	res.status(200).json({ data: task, total: task.length });
};

const createTask = (req, res) => {
	res.json(req.body);
};

const getTask = (req, res) => {
	res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
	res.send("update task");
};
const deleteTask = (req, res) => {
	res.send("delete task");
};

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
};

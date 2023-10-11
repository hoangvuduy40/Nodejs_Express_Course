const express = require("express");
const router = express.Router();
const {
	getAllTasks,
	createTask,
	deleteTask,
	getTask,
	updateTask,
} = require("../controllers/tasks");
const authMiddleware = require("../middleware/auth");

router.route("/").get(authMiddleware, getAllTasks);
router.route("/:id").get(authMiddleware, getTask);

module.exports = router;

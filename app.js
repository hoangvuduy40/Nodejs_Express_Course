require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const tasks = require("./routes/tasks");
const mainRouter = require("./routes/main");
const productRouter = require("./routes/product");
const connect = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

app.set("trust proxy", 1);
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // limit each IP to 100 requests per windowMs
	}),
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

// middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api/v1", mainRouter);
app.use("/api/v1/tasks", tasks);
app.use("/api/v1/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 9000;

const start = async () => {
	try {
		await connect(process.env.MONGO_URI);
		app.listen(port, console.log(`Server is listening on port ${port}`));
	} catch (error) {
		console.log(error);
	}
};
start();

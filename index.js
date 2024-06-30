const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const app = express();
const { connectMongoDb } = require('./connection');
const {restrictToLoggedInUserOnly} = require('./middlewares/auth')

require("dotenv").config();

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRoutes');
const userRoute = require('./routes/user');

// Getting data from .env file
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

//Connection to MongoDB
connectMongoDb(MONGODB_URI);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//Routes
app.use("/url", restrictToLoggedInUserOnly ,urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);


//Connect to Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
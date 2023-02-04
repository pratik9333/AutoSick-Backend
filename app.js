require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const db = require('./utils/db');
db.connect()
	.then(() => {
		console.log('Database connected!');
	})
	.catch(console.log);

const userRoutes = require('./routes/user.routes');
app.use('/api/v1/user', userRoutes);

module.exports = app;

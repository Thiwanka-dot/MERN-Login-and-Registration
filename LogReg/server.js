const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const database = require('./config/database');

dotenv.config();

const app = express();

//Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL, // Allowed frontend domain
    credentials: true, // Allow cookies
    methods: ['GET','POST','PUT','DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type','Authorization'] // Allow Headers
}));
app.use(cookieParser());

//Application Routes
const authRouter = require('./routes/authRoutes');
app.use('/api/v1/auth', authRouter);

//Listening to the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    await database();
})
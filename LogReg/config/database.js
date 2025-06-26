const mongoose = require('mongoose');

const database = async () => {
    try {
        const db_uri = process.env.DB_URI;
        await mongoose.connect(db_uri)
        console.log('Database connected successfully');
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = database;
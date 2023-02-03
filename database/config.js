const mongoose = require('mongoose');
const dbConnection = async () => {
    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect( process.env.MONGODB_CNN, { });
        console.log('init bd in line');
    } catch (error) {
        console.log(error);
        throw new Error('Error in init db');
    }
}

module.exports = {
    dbConnection
};
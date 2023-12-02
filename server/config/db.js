const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
	try {
		const connString = 'mongodb+srv://'+process.env.MONGO_DB_USERNAME+':' + process.env.MONGO_DB_PASSWORD + '@ecommerce.usa3wre.mongodb.net/'
		// console.log(connString)
		const conn = await mongoose.connect(connString)
		console.log(`MongoDB connected`)
		//${conn.connection.srvHost}
	} catch (error) {
		console.log(error)
		// proccess.exit(1)
	}
}

module.exports = connectDB
const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
	try {
		const connString = process.env.mongoURI
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
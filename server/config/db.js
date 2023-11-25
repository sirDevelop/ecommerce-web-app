const mongoose = require("mongoose")
const connectDB = async () => {
	try {
		const conn = await mongoose.connect('mongodb+srv://cwaf17:jYgVAnNeasrph6qf@ecommerce.usa3wre.mongodb.net/')
		console.log(`MongoDB connected`)
		//${conn.connection.srvHost}
	} catch (error) {
		console.log(error)
		// proccess.exit(1)
	}
}

module.exports = connectDB

//username: cwaf17
// password: jYgVAnNeasrph6qf

//mongodb+srv://cwaf17:<password>@ecommerce.usa3wre.mongodb.net/
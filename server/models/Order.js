const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
	cart: {
		// will be object converted to a string with JSON.stringify
		type: String,
		required: [true, 'Please fill the cart field'],
	},
	userEmail: {
		type: String,
		required: [true, 'Please fill the name field'],
	}
}, { timestamps: true })
module.exports = mongoose.model('Order', orderSchema)
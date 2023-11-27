const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
	// indicates whether paid or not. true means paid, false means not paid
	isOneClick: {
		type: Boolean,
        required: [true, 'Please fill the isOneClick field'],
		default: false,
    },
	uniqueCode: {
		type: String,
        required: [true, 'unique code is required'],
		unique: true,
	},
	cart: {
		// will be object converted to a string with JSON.stringify
		// JSON.stringify(catalogItem)
		// [{"id":"65636bf7c9056eb4ec9366d5","quantity":2,"title":"Oriental Glow Chinese Lamp Set","price":17.99,"category":"Decorative"},{"id":"65636bf7c9056eb4ec9366df","quantity":4,"title":"Whimsical Garden Guardian","price":7.99,"category":"Outdoors"},{"id":"65636bf7c9056eb4ec9366dd","quantity":2,"title":"Serenity Glass Mug","price":4.99,"category":"Home Goods"},{"id":"65636bf7c9056eb4ec9366db","quantity":2,"title":"Haven Flower Pot Set","price":7.99,"category":"Home Goods"},{"id":"65636bf7c9056eb4ec9366d7","quantity":2,"title":"Inspire Canvas Art Set","price":10.99,"category":"Decorative"}]
		type: String,
		required: [true, 'Please fill the cart field'],
	},
	userEmail: {
		type: String,
		required: [true, 'Please fill the name field'],
	}
}, { timestamps: true })
module.exports = mongoose.model('Order', orderSchema)
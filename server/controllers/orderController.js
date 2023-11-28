const devKeys = require('../config/dev');
const asyncHandler = require('express-async-handler')
const Order = require('../models/Order')
const CatalogItem = require('../models/CatalogItem')
const { uuid } = require('uuidv4');
const stripe = require("stripe")(devKeys.stripeSecretKey)

// pull all items from the database mongo
const getOrderHistory = asyncHandler(async (req, res) => {
	try {
		if (req.user) {
			const orderHistory = await Order.find({ userEmail: req.user.emails[0].value });
			// console.log("orderHistory", orderHistory);
			res.status(200).json({
				orderHistory
			})
		} else {
			res.status(402)
			throw new Error("Invalid credentials")
		}

	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong when getting order history ' + error)
	}
});

const checkoutOrder = asyncHandler(async (req, res) => {
	try {
		if (req.user) {
			if (req.body.cart) {
				let cart_info = []
				JSON.parse(req.body.cart).map((item, i) => {
					cart_info.push({
						price_data: {
							currency: "usd",
							product_data: { name: item.title },
							unit_amount: Math.round(parseFloat(item.price) * 100)
						},
						quantity: item.quantity
					});
				});
				// console.log(cart_info);
                const order = await Order.create({
					isOneClick: false,
					cart: req.body.cart,
					userEmail: req.user.emails[0].value,
					uniqueCode: uuid(),
                    stripeSessionId: "-"
				})
				const session = await stripe.checkout.sessions.create({
					payment_method_types: ["card"],
					mode: "payment",
					line_items: cart_info,
					success_url: `http://localhost:3000/payment/success/${order.uniqueCode}/{CHECKOUT_SESSION_ID}`,
					cancel_url: `http://localhost:3000/payment/failed/${order.uniqueCode}/{CHECKOUT_SESSION_ID}`,
				})
                await Order.findOneAndUpdate({_id: order._id}, {stripeSessionId: session.id})
                
				res.status(200).json({ url: session.url })

			} else {
				res.status(404)
				throw new Error("Nothing in cart")
			}

			// res.status(200).json({
			//     "Success": true,
			// })
		} else {
			res.status(402)
			throw new Error("Invalid credentials")
		}
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong when checking out order ' + error)
	}
})

const oneClickBuy = asyncHandler(async (req, res) => {
	try {
		if (req.user) {
			const { catalogId } = req.body
			const catalogItem = await CatalogItem.findOne({ _id: catalogId })
			if (catalogItem) {
				const order = await Order.create({
					isOneClick: true,
					cart: JSON.stringify([{ "id": catalogId, "quantity": 1, "title": catalogItem.itemName, "price": catalogItem.price, "category": catalogItem.category }]),
					userEmail: req.user.emails[0].value,
					uniqueCode: uuid(),
					stripeSessionId: "-"
				})
				const session = await stripe.checkout.sessions.create({
					payment_method_types: ["card"],
					mode: "payment",
					line_items: [{
						price_data: {
							currency: "usd",
							product_data: {
								name: catalogItem.itemName,
								// images: [`https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fpublic-assets.meredithcorp.io%2Ff926647f3c831a8bb7a3024468adfd8f%2F1700772845613image.jpg&q=60&c=sc&orient=true&poi=auto&h=512`],
							},
							unit_amount: Math.round(parseFloat(catalogItem.price) * 100), // give in cents
						},
						quantity: 1,
					}],
					success_url: `http://localhost:3000/payment/success/${order.uniqueCode}/{CHECKOUT_SESSION_ID}`,
					cancel_url: `http://localhost:3000/payment/failed/${order.uniqueCode}/{CHECKOUT_SESSION_ID}`,
				})
				await Order.findOneAndUpdate({ _id: order._id }, { stripeSessionId: session.id })
				res.status(200).json({ url: session.url })
			} else {
				res.status(404)
				throw new Error("Item not found")
			}
			// const orderHistory = await Order.find({userEmail: req.user.emails[0].value});
			// console.log("orderHistory", orderHistory);
			// res.status(200).json({
			//     orderHistory
			// })
		} else {
			res.status(402)
			throw new Error("Invalid credentials")
		}

	} catch (error) {
		res.status(422)
		throw new Error('Error in one click buy ' + error)
	}
});

const verify = asyncHandler(async (req, res) => {
	try {
		if (req.user) {
			const { code, session } = req.body
			const orderStatus = await Order.findOne({ uniqueCode: code });
			if (orderStatus) {
				const payment_status = await stripe.checkout.sessions.retrieve(session)
				if (payment_status.payment_status === "paid") {
					res.status(200).json({
						status: payment_status.payment_status
					})

                    // if order is successfully, we update the catalog items quantity accordingly
                    JSON.parse(orderStatus.cart).map(async (item, i) => {
                        await CatalogItem.findOneAndUpdate({ _id: item.id }, {$inc: {quantity: -1 * item.quantity}});
                    })
				} else {
					res.status(402).json({
						message: "Not paid"
					})
					throw new Error("Status is not paid")
				}
			} else {
				res.status(404).json({
					message: "Not found"
				})
				throw new Error("Order not found")
			}
		} else {
			res.status(402)
			throw new Error("Invalid credentials")
		}

	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong when verifying order status ' + error)
	}
});


module.exports = { getOrderHistory, checkoutOrder, oneClickBuy, verify }
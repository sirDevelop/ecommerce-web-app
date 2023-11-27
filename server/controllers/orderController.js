const asyncHandler = require('express-async-handler')
const Order = require('../models/Order')

const checkoutOrder = asyncHandler(async (req, res) => {
    try {
        if(req.user){
            // add stripe functionality here

            
            // await Order.create({
            //     cart: req.body.cart,
            //     userEmail: req.user.emails[0].value,
            // })

            res.status(200).json({
                "Success": true,
            })
        }else{
            res.status(402)
            throw new Error("Invalid credentials")
        }
    } catch (error) {
        res.status(422)
        throw new Error('Something went wrong when checking out order ' + error)
    }
})
// pull all items from the database mongo
const getOrderHistory = asyncHandler(async (req, res) => {
    try {
        if(req.user){
            const orderHistory = await Order.find({userEmail: req.user.emails[0].value});
            console.log("orderHistory", orderHistory);
            res.status(200).json({
                orderHistory
            })
        }else{
            res.status(402)
            throw new Error("Invalid credentials")
        }

    } catch (error) {
        res.status(422)
        throw new Error('Something went wrong when getting order history ' + error)
    }
});

module.exports = { getOrderHistory, checkoutOrder }
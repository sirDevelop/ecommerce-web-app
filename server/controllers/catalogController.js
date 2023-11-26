const asyncHandler = require('express-async-handler')
const CatalogItem = require('../models/CatalogItem')

const createCatalog = asyncHandler(async (req, res) => {
    try {
        await CatalogItem.create({
        	itemName: "Explorer's Haven Backpack"
        	,price: "20.99"
        	,description: "Unleash your inner adventurer with the Explorer's Haven Backpack. Designed for comfort and functionality, this sleek pack features multiple compartments for easy organization, padded shoulder straps for comfort, and a durable build that stands up to any expedition. Elevate your journeys with style and practicality in every step."
        	,imageURL: "./images/catalog_items/backpack.jpg"
        	,category: "Outdoors"
        ,quantity: 100
        })
        await CatalogItem.create({
        	itemName: "Chic Braided Basket"
        	,price: "9.99"
        	,description: "Elevate your home organization with our Chic Braided Bliss Basket. Handcrafted with precision, its intricate braided design adds a touch of elegance to any space. This versatile basket seamlessly combines style and functionality, making it the perfect addition to declutter and enhance the aesthetics of your home."
        	,imageURL: "./images/catalog_items/basket.jpg"
        	,category: "Home Goods"
        ,quantity: 100
        })
        await CatalogItem.create({
        	itemName: "Radiance Reveal Skin Brush Set"
        	,price: "9.99"
        	,description: "Unveil your natural glow with the Radiance Reveal Skin Brush Set. Crafted for skincare enthusiasts, this comprehensive set includes expertly designed brushes for exfoliation, cleansing, and massage. Elevate your skincare routine, promote circulation, and achieve a healthy, radiant complexion with this essential set."
        	,imageURL: "./images/catalog_items/brushes.jpg"
        	,category: "Skincare"
        ,quantity: 100
        })
        await CatalogItem.create({
        	itemName: "Tranquil Flames Candle Set"
        	,price: "14.99"
        	,description: "Immerse yourself in serenity with our Tranquil Flames Candle Set. Each hand-poured candle, infused with soothing scents, transforms any space into a haven of calm. Elevate your ambiance with this curated set, providing moments of relaxation and warm, flickering tranquility in every room."
        	,imageURL: "./images/catalog_items/candle_set.jpg"
        	,category: "Home Goods"
        ,quantity: 100
        })
        await CatalogItem.create({
        	itemName: "Oriental Glow Chinese Lamp Set"
        	,price: "17.99"
        	,description: "Illuminate your space with the allure of the East using our Oriental Glow Chinese Lamp Set. Inspired by traditional designs, these exquisite lamps cast a warm and inviting ambiance. Transform your surroundings into a haven of cultural elegance with this set, fusing timeless charm with modern style."
        	,imageURL: "./images/catalog_items/chinese_lamp.jpg"
        	,category: "Decorative"
        ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Inspire Canvas Art Set"
        	,price: "10.99"
        	,description: "Immerse yourself in creativity with our Inspire Canvas Art Set. Unleash your artistic spirit with a collection of high-quality paints, brushes, and canvases. Whether you're a seasoned artist or a beginner, this set provides endless possibilities for expressing your imagination and bringing your visions to life."
        	,imageURL: "./images/catalog_items/art_set.jpg"
        	,category: "Decorative"
        ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Enchanting Crystal Harmony Set"
        	,price: "13.99"
        	,description: "Embrace the magic with our Enchanting Crystal Harmony Set. Carefully curated, this collection of ethereal crystals radiates positive energy, promoting balance and serenity. Elevate your spiritual journey, enhance your space, and experience the transformative power of these mesmerizing crystals. Invite tranquility and radiance into your life."
        	,imageURL: "./images/catalog_items/crystals.jpg"
        	,category: "Metaphysical"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Haven Flower Pot Set"
        	,price: "7.99"
        	,description: "Transform your space into a floral sanctuary with our Haven Flower Pot Set. Crafted for plant enthusiasts, these stylish pots blend seamlessly with any decor. Elevate your greenery, infuse your surroundings with nature's beauty, and create a vibrant haven with this charming set."
        	,imageURL: "./images/catalog_items/flower_pot_set.jpg"
        	,category: "Home Goods"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Serenity Glass Mug"
        	,price: "4.99"
        	,description: "Immerse yourself in tranquility with our Serenity Glass Mug. Crafted for elegance and comfort, this crystal-clear mug transforms your sipping experience. Whether it's your morning coffee or evening tea, the sleek design and quality glass elevate each moment, making every sip a peaceful and delightful ritual."
        	,imageURL: "./images/catalog_items/glass_mug.jpg"
        	,category: "Home Goods"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Whimsical Garden Guardian"
        	,price: "7.99"
        	,description: "Meet our Whimsical Garden Guardian, a charming gnome ready to bring joy to your outdoor haven. Handcrafted with care, this delightful gnome adds a touch of magic to your garden with its vibrant colors and playful demeanor. Invite enchantment and a dash of whimsy to your outdoor space!"
        	,imageURL: "./images/catalog_items/gnome.jpg"
        	,category: "Outdoors"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Opulent Golden Serving Tray"
        	,price: "13.99"
        	,description: "Elevate your dining experience with our Opulent Golden Serving Tray. This luxurious masterpiece seamlessly blends functionality with glamour, providing a stunning platform for presenting culinary delights. Crafted with precision and coated in resplendent gold, it transforms every meal into a regal affair, indulging your senses."
        	,imageURL: "./images/catalog_items/golden_tray.jpg"
        	,category: "Home Goods"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Ruby Glow Table Lamp"
        	,price: "11.99"
        	,description: " Illuminate your space with the warm embrace of our Ruby Glow Table Lamp. This captivating red lamp, with its sleek design and vibrant hue, adds a touch of sophistication to any room. Create an ambiance of warmth and style as the radiant glow transforms your space into a cozy retreat."
        	,imageURL: "./images/catalog_items/lamp.jpg"
        	,category: "Outdoors"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Apple Laptop, Trusted Performance"
        	,price: "479.99"
        	,description: "Unleash the power of innovation with our Used Apple Laptop. This reliable device combines sleek design with proven functionality. Equipped with Apple's signature features, it offers a seamless user experience at an affordable price. Join the Apple ecosystem and elevate your productivity with this trusted companion."
        	,imageURL: "./images/catalog_items/laptop.jpg"
        	,category: "Electronics"
            ,quantity: 100
        })
    } catch (error) {
        res.status(422)
        throw new Error('Something went wrong when retrieving catalog items ' + error)
    }
});

// pull all items from the database mongo
const getCatalogItems = asyncHandler(async (req, res) => {
    try {
        const { category, priceMin, priceMax, ascendingPrice, loadMore, page } = req.body
        const maxItems = page && loadMore ? 10 * page : 10
        let query = {}
        let sort = {}
        if (category) {
            query = { ...query, "category": category };
            // do the filter
        }
        if (priceMin && priceMin > 0) {
            query = { ...query, "priceMin": priceMin };
        }

        if (priceMax) {
            query = { ...query, "priceMax": priceMax };
        }

        if (!ascendingPrice) {
            sort = { length: -1 };
        }

        const total = await CatalogItem.find(query).length;
        const pages = total / maxItems
        const getCatalogItems = await CatalogItem.find(query).sort(sort).skip((page - 1) * maxItems).limit(maxItems);
        // const getCatalogItems = await CatalogItem.find(query, {sort: {length: -1}, limit: 3})


        res.status(200).json({
            getCatalogItems,
            page: page,
            loadMore: pages > 1
        })
    } catch (error) {
        res.status(422)
        throw new Error('Something went wrong when retrieving catalog items ' + error)
    }
});

module.exports = { getCatalogItems, createCatalog }
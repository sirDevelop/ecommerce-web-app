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

        await CatalogItem.create({
        	itemName: "EcoGlow LED Innovation"
        	,price: "9.99"
        	,description: "Illuminate your space with our EcoGlow LED lightbulb, a cutting-edge solution for energy-efficient brilliance. Boasting long-lasting performance, this eco-friendly bulb not only brightens your room but also reduces your carbon footprint. Embrace the future of lighting with EcoGlow – where sustainability meets luminosity."
        	,imageURL: "./images/catalog_items/lightbulb.jpg"
        	,category: "Electronics"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Classic Glow Incandescent"
        	,price: "7.99"
        	,description: "Experience timeless warmth with our Classic Glow Incandescent lightbulb. Designed for a cozy ambiance, this bulb radiates a soft, inviting light reminiscent of traditional lighting. Perfect for creating a nostalgic atmosphere, the Classic Glow brings a touch of vintage charm to any room. Illuminate your moments with tradition."
        	,imageURL: "./images/catalog_items/lights.jpg"
        	,category: "Electronics"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Harmony Mandala Creation"
        	,price: "59.99"
        	,description: "Elevate your space with our 'Harmony Mandala Creation', a captivating artwork that seamlessly blends intricate design and vibrant colors. This mandala, inspired by unity and balance, invites tranquility into your surroundings. Immerse yourself in its beauty and bring a touch of serenity to your living space."
        	,imageURL: "./images/catalog_items/mandela.jpg"
        	,category: "Artwork"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Serene Touch Massage Set"
        	,price: "19.99"
        	,description: "Indulge in relaxation with our Serene Touch Massage Set. Crafted for ultimate comfort, this kit includes a premium massage oil, soothing aromatherapy candles, and a plush massage roller. Elevate your self-care routine and unwind in the tranquility of a spa-like experience from the comfort of your home."
        	,imageURL: "./images/catalog_items/massage.jpg"
        	,category: "Skincare"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Cozy Comfort Mug Duo"
        	,price: "7.99"
        	,description: "Embrace warmth and style with our Cozy Comfort Mug Duo. This set of two elegantly designed mugs combines functionality with aesthetic appeal, perfect for sipping your favorite beverages in blissful relaxation. Elevate your daily ritual and enjoy the simple pleasure of a well-crafted, comforting cup."
        	,imageURL: "./images/catalog_items/mugs.jpg"
        	,category: "Ceramics"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Vivid Expressions Paint Set"
        	,price: "9.99"
        	,description: "Unleash your creativity with the Vivid Expressions Paint Set. This carefully curated collection of high-quality paints offers a spectrum of rich colors, ensuring your artistic visions come to life with vibrancy and precision. Elevate your artistry and explore a world of possibilities with this inspiring paint set."
        	,imageURL: "./images/catalog_items/paints.jpg"
        	,category: "Artwork"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Dreamy Pastel Harmony"
        	,price: "9.99"
        	,description: "Immerse yourself in the ethereal world of 'Dreamy Pastel Harmony.' This set features a curated palette of soft, soothing pastel shades, perfect for adding a touch of serenity to your artistic endeavors. Unleash your imagination and create enchanting artworks with this delightful pastel set."
        	,imageURL: "./images/catalog_items/pastels.jpg"
        	,category: "Artwork"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Pretty Piggy Pink Notebook"
        	,price: "9.99"
        	,description: "Capture your thoughts in style with our 'Pretty Piggy Pink Notebook.' Adorned with an adorable pig design, this whimsical notebook combines charm with functionality. The pink cover and quality pages make it a delightful accessory for both work and play, adding a touch of joy to your everyday note-taking."
        	,imageURL: "./images/catalog_items/pig_notebook.jpg"
        	,category: "Office"
            ,quantity: 100
        })
        await CatalogItem.create({
        	itemName: "Elegant Harmony Plate Set"
        	,price: "19.99"
        	,description: "Elevate your dining experience with our Elegant Harmony Plate Set. Crafted for sophistication, this set features exquisite plates designed to complement any table setting. The perfect blend of style and functionality, these plates add a touch of refinement to your culinary presentations, making every meal special."
        	,imageURL: "./images/catalog_items/plates.jpg"
        	,category: "Ceramics"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Artisan Craft Pottery Set"
        	,price: "49.99"
        	,description: "Unleash your creativity with our Artisan Craft Pottery Set. This all-inclusive kit provides everything you need to embark on a pottery journey—premium clay, sculpting tools, and a step-by-step guide. Elevate your craftsmanship and create unique, handcrafted pottery pieces that reflect your artistic expression and style."
        	,imageURL: "./images/catalog_items/pottery.jpg"
        	,category: "Ceramics"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Radiant Prism Rainbow Crystal"
        	,price: "19.99"
        	,description: "Behold the brilliance of our Radiant Prism Rainbow Crystal. This exquisite crystal captures and reflects an enchanting spectrum of colors, casting a mesmerizing glow. Perfect for decor or meditation, its vibrant hues evoke positivity and harmony, infusing any space with a captivating and uplifting energy."
        	,imageURL: "./images/catalog_items/rainbow_crystal.jpg"
        	,category: "Metaphysical"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Natural Harmony Wood Sculpture"
        	,price: "179.99"
        	,description: "Embrace the beauty of nature with our Natural Harmony Wood Sculpture. Meticulously carved from sustainable wood, this captivating sculpture embodies organic elegance. Its flowing lines and intricate details bring a touch of serenity to any space, creating a harmonious blend of artistry and the natural world."
        	,imageURL: "./images/catalog_items/sculpture.jpg"
        	,category: "Artwork"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Vintage Traveler's Treasure"
        	,price: "19.99"
        	,description: "Uncover the allure of our Vintage Traveler's Treasure, an exquisite antique suitcase that narrates tales of journeys past. Crafted with timeless elegance, its weathered charm and ornate details make it a statement piece. Elevate your space with this relic of bygone adventures, where every scratch tells a story."
        	,imageURL: "./images/catalog_items/suitcase.jpg"
        	,category: "Travel"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Blossom Bliss Vase Set"
        	,price: "19.99"
        	,description: "Transform your space with our Blossom Bliss Vase Set. This curated collection of elegant vases seamlessly blends contemporary design with timeless charm. Perfect for displaying your favorite blooms, the set adds a touch of sophistication to any room, creating a harmonious blend of nature and artistry."
        	,imageURL: "./images/catalog_items/vase.jpg"
        	,category: "Home Goods"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Trailblazer Outdoor Watch"
        	,price: "29.99"
        	,description: "Conquer the great outdoors with our Trailblazer Outdoor Watch. Engineered for adventure, this rugged timepiece combines durability with precision. Water-resistant and equipped with essential features like altimeter and compass, it's the perfect companion for explorers. Elevate your outdoor experience with a watch that keeps up with your adventures."
        	,imageURL: "./images/catalog_items/watch.jpg"
        	,category: "Electronics"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Elegance in Crystal"
        	,price: "7.99"
        	,description: "Sip in style with our 'Elegance in Crystal' wine glass. Crafted with precision and sophistication, this glass enhances the tasting experience. The slender stem and crystal-clear bowl elevate any occasion, making it the perfect vessel to appreciate and savor your favorite wines in utmost refinement. Cheers to elegance!"
        	,imageURL: "./images/catalog_items/wine_glass.jpg"
        	,category: "Home Goods"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Vineyard Elegance Wine Set"
        	,price: "29.99"
        	,description: "Elevate your wine experience with our Vineyard Elegance Wine Set. This meticulously curated collection features two exquisite glasses and a decanter, all designed to enhance the flavors and aromas of your favorite wines. Indulge in the art of wine appreciation with this sophisticated and stylish set. Cheers to refinement!"
        	,imageURL: "./images/catalog_items/wine_glass_set.jpg"
        	,category: "Home Goods"
            ,quantity: 100
        })

        await CatalogItem.create({
        	itemName: "Graceful Wooden Stallion"
        	,price: "4.99"
        	,description: "Adorn your space with our Graceful Wooden Stallion ornament. Handcrafted with precision, this charming wooden horse adds a touch of rustic elegance to any setting. Its detailed craftsmanship and warm tones make it a timeless piece, evoking the spirit of nature and the allure of classic artistry."
        	,imageURL: "./images/catalog_items/wooden_horse.jpg"
        	,category: "Decorative"
            ,quantity: 100
        })
		res.status(200).json({})
    } catch (error) {
        res.status(422)
        throw new Error('Something went wrong when retrieving catalog items ' + error)
    }
});

// pull all items from the database mongo
const getCatalogItems = asyncHandler(async (req, res) => {
    try {
        const { category, priceMin, priceMax, descendingPrice, page } = req.body
        const maxItems = 12
        let query = {}
        let sort = {}
        if (category && category !== 'All') {
            query = { ...query, category: category }
        }
        // do the filter
        // if (priceMin && priceMin > 0) {
        //     query = { ...query, "priceMin": priceMin };
        // }

        // if (priceMax) {
        //     query = { ...query, "priceMax": priceMax };
        // }

        if (descendingPrice) {
            sort = { price: -1 };
        }

		const getCatalogItems = await CatalogItem.find(query).skip((page - 1) * maxItems).sort(sort).limit(maxItems)
		const moreItemsAvailable = await CatalogItem.find(query).skip(((page - 1) * maxItems) + 1).sort(sort).limit(maxItems)

        res.status(200).json({
            moreItemsAvailable: moreItemsAvailable.length >= maxItems,
            getCatalogItems,
        })
    } catch (error) {
        res.status(422)
        throw new Error('Something went wrong when retrieving catalog items ' + error)
    }
});

module.exports = { getCatalogItems, createCatalog }
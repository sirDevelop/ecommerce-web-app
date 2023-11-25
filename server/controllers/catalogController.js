const asyncHandler = require('express-async-handler')
const CatalogItem = require('../models/CatalogItem')

// pull all items from the database mongo
const getCatalogItems = asyncHandler(async (req, res) => {
    try {
		const {category, priceMin, priceMax, ascendingPrice, loadMore, page} = req.body
		const maxItems = page && loadMore ? 10*page : 10
		let query = {}
        let sort = {}
		if(category){
            query = {...query, "category": category};
			// do the filter
		}
        if(priceMin && priceMin > 0) {
            query = {...query, "priceMin": priceMin};
        }
        
        if(priceMax) {
            query = {...query, "priceMax": priceMax};
        }

        if(!ascendingPrice) {
            sort = { length: -1 };
        }
        
		const total = await CatalogItem.find(query).length;
		const pages = total/maxItems
		const getCatalogItems = await CatalogItem.find(query).sort(sort).skip((page-1)*maxItems).limit(maxItems);
		// const getCatalogItems = await CatalogItem.find(query, {sort: {length: -1}, limit: 3});

		// await CatalogItem.create({
		// 	itemName: ""
		// 	,price: ""
		// 	,description: ""
		// 	,imageURL: ""
		// 	,category: ""
		// })
        
		
		res.status(200).json({
			getCatalogItems,
			page: page,
			loadMore: pages>1
		})
	} catch (error) {
		res.status(422)
		throw new Error('Something went wrong when retrieving catalog items ' + error)
	}
});

module.exports = {getCatalogItems}
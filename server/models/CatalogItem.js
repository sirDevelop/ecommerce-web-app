const mongoose = require('mongoose');
const { Schema } = mongoose;

const catalogSchema = new Schema({
  itemName: {type: String, required: true},
  price: { type: Number, default: 0, required: true },
  description: { type: String, default: '', required: true },
  imageURL: { type: String, default: '', required: true },
  category: { type: String, default: '', required: true }
});

mongoose.model('CatalogItem', catalogSchema);

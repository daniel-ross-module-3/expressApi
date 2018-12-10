const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const itemSchema = new Schema({
  name: String,
  description: String,
  cost: Number,
  retailPrice: Number,
  // Margin: this.retailPrice - this.Cost,
})

const Item = mongoose.model('Item', itemSchema)
// model is called Task with capital letter and no S at the end
// therefore, the collection in the db will be called 'tasks' with a lowercase l and an s at the end


module.exports = Item;
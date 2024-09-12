const mongoose = require("mongoose")
const {Schema, model } = require("mongoose")

const subcategorySchema = new Schema({
    name: {
        type: String
    },
    category_id: {type: mongoose.Schema.ObjectId, ref: 'Category'}
}, {
    collection: "subcategories"
})

module.exports = model("Subcategory", subcategorySchema)
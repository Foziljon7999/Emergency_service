const mongoose = require("mongoose")
const {Schema, model} = require("mongoose")

const situationSchema = new Schema({
    user_id: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    subcategory_id: {
        type: mongoose.Schema.ObjectId, ref: 'Subcategory'
    },
    location: {
        type: String
    },
    status: {
        type: String
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String 
    }
},{
    collection: "situation"
})

module.exports = model("Situation", situationSchema)
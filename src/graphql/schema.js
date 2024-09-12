const { makeExecutableSchema } = require("@graphql-tools/schema")

const users = require("../modules/users")
const categories = require("../modules/categories")
const subcategories = require("../modules/subcategories")
const situation = require("../modules/situation")

let schema = makeExecutableSchema({
typeDefs: [users.typeDefs, categories.typeDefs, subcategories.typeDefs, situation.typeDefs],
resolvers: [users.resolvers, categories.resolvers, subcategories.resolvers, situation.resolvers]
})

module.exports = schema
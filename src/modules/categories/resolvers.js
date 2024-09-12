const pubsub = require("../../graphql/pubsub")
const categoryModel = require("./model")

const resolvers = {
    Query: {
        categories: async() => await categoryModel.find()
    },
    Mutation: {
        createCategory: async (_, {name}) => {
            let category = await categoryModel.create({name})
            await category.save()

            let categories = await categoryModel.find()
            pubsub.publish('CATEGORY_CREATE', {categories})
            return categories
        },

        updateCategory: async (_,{id, name}) => {
            const category = await categoryModel.findByIdAndUpdate(
                id,
                {name},
                {new: true}
            )
            await category.save()
            let categories = await categoryModel.find()
            pubsub.publish('CATEGORY_UPDATE', {categories})
            return categories
        },

        deleteCategory: async(_, {id}) => {
            const category = await categoryModel.findByIdAndDelete(
                id,
                {new: true}
            )

            let categories = await categoryModel.find()
            pubsub.publish('CATEGORY_DELETE', {categories})
            return categories
        }
    },

    Subscription: {
        categories: {
            subscribe: () => pubsub.asyncIterator(["CATEGORY_CREATE", "CATEGORY_UPDATE", "CATEGORY_DELETE"])
        }
    }
}

module.exports = resolvers

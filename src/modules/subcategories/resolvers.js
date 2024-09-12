const pubsub = require("../../graphql/pubsub")
const subcategoryModel = require("./model")

const resolvers = {
    Query: {
        subcategories: async (_, { category_id }) => {
            return await subcategoryModel.find({ category_id: category_id }).sort({ name: 1 }); 
          }
    },

    Mutation: {
        createSubcategory: async(_, {name, category_id}) => {
            await subcategoryModel.create({name, category_id})
            
            let subcategories = await subcategoryModel.find()
            pubsub.publish("SUBCATEGORY_CREATE",{subcategories})
            return subcategories
        },

        updateSubcategory: async(_, {id, name, category_id}) => {
            let subcategory = await subcategoryModel.findByIdAndUpdate(
                id,
                {name, category_id},
                {new: true}
            )
            
            await subcategory.save()
            let subcategories = await subcategoryModel.find()
            pubsub.publish("SUBCATEGORY_UPDATE",{subcategories})
            return subcategories
        },

        deleteSubcategory: async (_, {id}) =>{
            await subcategoryModel.findByIdAndDelete(
                id,
                {new: true}
            )
            let subcategories = await subcategoryModel.find()
            pubsub.publish("SUBCATEGORY_DELETE",{subcategories})
            return subcategories
        }
    },
    Subscription: {
        subcategories: {
            subscribe: () => pubsub.asyncIterator(["SUBCATEGORY_CREATE", "SUBCATEGORY_UPDATE", "SUBCATEGORY_DELETE"])
        }
    }
}

module.exports = resolvers
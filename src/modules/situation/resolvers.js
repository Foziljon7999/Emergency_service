const pubsub = require("../../graphql/pubsub")
const situationSchema = require("./model")
const subcategoryModel = require("../subcategories/model")

const resolvers = {
    Query: {
        situations: async (_, { subcategory_id }) => {
            const subcategories = await subcategoryModel.find({ subcategory_id: subcategory_id });
            const subcategoryIds = subcategories.map(subcategory => subcategory._id);
            
            return await situationSchema.find({ subcategory_id: { $in: subcategoryIds } }).sort({ created_at: -1 }); 
          }

    },
    Mutation: {
        createSituation: async (_, {user_id, subcategory_id, location, status, created_at, updated_at}) => {
            let situation = await situationSchema.create({user_id, subcategory_id, location, status, created_at, updated_at})
            await situation.save()

            let situations = await situationSchema.find()
            pubsub.publish("SITUATION_CREATE", {situation})
            return situations
        },
        updateSituation: async (_,{id, user_id, subcategory_id, location, status, created_at, updated_at}) => {
            let situation = await situationSchema.findByIdAndUpdate(
                id,
                {user_id, subcategory_id, location, status, created_at, updated_at},
                {new: true}
            )
            let situations = await situationSchema.find()
            pubsub.publish("SITUATION_UPDATE", {situation})
            return situations
        },
        deleteSituation: async(_, {id}) => {
            let situation = await situationSchema.findByIdAndDelete(
                id,
                {new: true}
            )
            let situations = await situationSchema.find()
            pubsub.publish("SITUATION_DELETE", {situation})
            return situations
        }
    },
    Subscription: {
        situation: {
            subscribe: () => pubsub.asyncIterator(["SITUATION_CREATE", "SITUATION_UPDATE", "SITUATION_DELETE"])
        }
    }
}

module.exports = resolvers
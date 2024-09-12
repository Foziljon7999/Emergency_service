const User = require("./model")

const resolvers = {
    Query: {
      users: async () => await User.find()
    }, 
    Mutation: {
        register: async (_, { input }) => {
            const { name, phone, email } = input;
            try {
              const user = new User({ name, phone, email });
              await user.save();
              return user
            } catch (error) {
              throw new Error('Error registering user: ' + error.message);
            }
          },

        createUser: async (_, {name, phone, email}) => {
            try {
                const users = new User({name, phone, email})
                await users.save()
                return users
            } catch (error) {
                throw new Error('Error createUser: ' + error.message);
            }
        },
        
        updateUser: async (_, {id, name, phone, email}) => {
            try {
                const user = await User.findByIdAndUpdate(
                    id,
                    { name, phone, email},
                    {new: true}
                )
                if(!user){
                    throw new Error('User not found')
                }
                return user
            } catch (error) {
                throw new Error('Error updating user: ' + error.message);
            }
        },

        deleteUser: async (_, {id}) => {
            try {
                const user = await User.findByIdAndDelete(
                    id,
                    {new : true}
                )
                if(!user){
                    throw new Error('User not found')
                }
                return user
            } catch (error) {
                throw new Error('Error updating user: ' + error.message);
            }
        }
    }
}

module.exports = resolvers
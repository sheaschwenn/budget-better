const { AuthenticationError } = require('apollo-server-express');
const { User,  } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            return User.findOne({_id: context.user._id}).populate(['Expenses', 'Income','Settings', 'Goal'])
        }
    },

    Mutation: {
        login: async (parent, {email, password}) =>{
            const user = await User.findOne({email})
            if(!user){
                throw new AuthenticationError('Incorrect email or password')
            }
        },
        addUser: {

        },
        createExpense: {

        },
        updateExpense: {

        },
        deleteExpense: {

        },
        createIncome: {

        },
        updateIncome: {

        },
        deleteIncome: {

        },
        createGoal: {

        },
        updateGoal:{

        },
        deleteGoal: {

        },
        updateSetting: {

        }
    }
}
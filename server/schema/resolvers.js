const { AuthenticationError } = require('apollo-server-express');
const { User, Expense,  } = require('../models');
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
            const correctPassword = await user.isCorrectPassword(password)
            if(!correctPassword){
                throw new AuthenticationError("Incorrect email or password")
            }
            const token = signToken(user)

            return{ token, user }
        },
        addUser: async(parent, args) => {
            const user = await User.create(args)
            const token = signToken(user);
            return{ token, user }

        },
        createExpense: async(parent, args, context) =>{
           if(context.user){
            const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$push: {Expenses: args}},
                {runValidators: true, new: true}
            )
            return updatedUser
           }
           throw new AuthenticationError('You need to be logged in!');

        },
        updateExpense: async(parent, args, context) =>{
            if(context.user){
                const updatedExpense = await Expense.findOneAndUpdate(
                    {_id: args._id},
                    {$set: args},
                    {runValidators: true, new: true}
                )
                return updatedExpense
            }
        },
        deleteExpense:async(parent, args, context) => {
            if(context.user){
                const deleteExpense = await Expense.findOneAndDelete(
                    {_id: args}
                )
                return deleteExpense
                }
            }
        },
        createIncome: async(parent, args, context) =>{

        },
        updateIncome: async(parent, args, context) =>{

        },
        deleteIncome: async(parent, args, context) =>{

        },
        createGoal: async(parent, args, context) =>{

        },
        updateGoal: async(parent, args, context) =>{

        },
        deleteGoal: async(parent, args, context) => {

        },
        updateSetting: async(parent, args, context) => {

        }
    }
}
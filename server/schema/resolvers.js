const { AuthenticationError } = require('apollo-server-express');
const { User, Expense, Income, Goal, Setting,  } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const user = await User.findOne({ _id: context.user._id })
                .populate('goal')
                .populate('expenses')
                .populate('income');
              console.log(user);
              return user;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
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
        createExpense: async(parent, { category, amount, recurring }, context) =>{
          if(context.user){
            const expense = await Expense.create({ category, amount, recurring }) 
             await User.findOneAndUpdate(
                {_id: context.user._id},
                {$addToSet: {expenses: expense._id}},
                {runValidators: true, new: true}
            )
            return expense
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
            },
        createIncome:async(parent, { name, passive, amount, recurringOrSalary}, context) =>{
            if(context.user){
                const income = await Income.create( {name, passive, amount, recurringOrSalary})
             await User.findOneAndUpdate(
                 {_id: context.user._id},
                 {$addToSet: {income: income._id}},
                 {runValidators: true, new: true}
             )
             return income
            }
            throw new AuthenticationError('You need to be logged in!');

        },
        updateIncome: async(parent, args, context) =>{
            if(context.user){
                const updatedIncome = await Income.findOneAndUpdate(
                    {_id: args._id},
                    {$set: args},
                    {runValidators: true, new: true}
                )
                return updatedIncome
            }
        },
        deleteIncome: async(parent, args, context) =>{
            if(context.user){
                const deleteIncome = await Income.findOneAndDelete(
                    {_id: args}
                )
                return deleteIncome
                }
        },
        createGoal: async(parent, {name, amountToSave, byDate, shortTerm}, context) =>{
            if(context.user){
                const goal = await Goal.create({name, amountToSave, byDate, shortTerm})
                await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push: {goal: goal._id}},
                    {runValidators: true, new: true}
                )
                return goal
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updateGoal: async(parent, args, context) =>{
            if(context.user){
                const updatedGoal = await Goal.findOneAndUpdate(
                    {_id: args._id},
                    {$set: args},
                    {runValidators: true, new: true}
                )
                return updatedGoal
            }
        },
        deleteGoal: async(parent, args, context) => {
            if(context.user){
                const deleteGoal = await Goal.findOneAndDelete(
                    {_id: args}
                )
                return deleteGoal
                }
        },
        updateSetting: async(parent, args, context) => {
            if(context.user){
                const updatedSetting = await Setting.findOneAndUpdate(
                    {_id: args._id},
                    {$set: args},
                    {runValidators: true, new: true}
                )
                return updatedSetting
            }
        },
    },
}

module.exports = resolvers
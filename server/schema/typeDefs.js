const {gql} = require('apollo-server-express');

const dateScalar = require('./dateScalar')

const typeDefs = gql`
scalar Date
type User{
    _id: ID
    name: String
    email: String
    createdOn: Date
    expenses: [Expense]
    income: [Income]
    settings: [Setting]
    goal: [Goal]
}

type Expense{
    _id: ID
    category: String
    amount: Int
    recurring: Boolean
    createdOn: Date
}

type Income{
    _id: ID
    name: String
    passive: Boolean
    amount: Int
    recurringOrSalary: Boolean
    createdOn: Date
}

type Setting{
    _id: ID!
    light: Boolean
    currency: String
    language: String
}

type Goal{
    _id: ID
    name: String
    amountToSave: Int
    byDate: Date
    shortTerm: Boolean
    createdOn: Date
}

type Auth{
    token: ID!
    user: User
}

type Query{
    users: [User]
    me: User
}

type Mutation{
    login(email: String!, password: String!): Auth
    addUser(name: String!, email: String!, password: String!): Auth
    createExpense( category: String!, amount: Float!, recurring: Boolean!): Expense
    updateExpense(_id:ID!, category: String, amount: Float, recurring: Boolean): User
    deleteExpense(expenseId: ID!): Expense
    createIncome(  name: String!, passive: Boolean!, amount: Float!, recurringOrSalary: Boolean!): Income
    updateIncome(_id: ID!, name: String, passive: Boolean, amount: Float!, recurringOrSalary: Boolean): User
    deleteIncome(incomeId: ID!): Income
    createGoal(name: String!, amountToSave: Float!, byDate: Date, shortTerm: Boolean!): Goal
    updateGoal(_id: ID!, name: String, amountToSave: Float, byDate: String, shortTerm: Boolean): User
    deleteGoal(goalId: ID!): Goal
    updateSetting(_id:ID!, light: Boolean, currency: String, language: String ): User

}
`

module.exports = typeDefs;
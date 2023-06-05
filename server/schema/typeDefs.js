const {gql} = require('apollo-server-express');

const typeDefs = gql`
type User{
    _id: ID
    name: String
    email: String
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
}

type Income{
    _id: ID
    name: String
    passive: Boolean
    amount: Int
    recurringOrSalary: Boolean
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
    byDate: String
    shortTerm: Boolean
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
    deleteExpense(_id: ID!): User
    createIncome(  name: String!, passive: Boolean!, amount: Float!, recurringOrSalary: Boolean!): User
    updateIncome(_id: ID!, name: String, passive: Boolean, amount: Float!, recurringOrSalary: Boolean): User
    deleteIncome(_id: ID!): User
    createGoal(name: String!, amountToSave: Float!, byDate: String!, shortTerm: Boolean!): User
    updateGoal(_id: ID!, name: String, amountToSave: Float, byDate: String, shortTerm: Boolean): User
    deleteGoal(_id: ID!): User
    updateSetting(_id:ID!, light: Boolean, currency: String, language: String ): User

}
`

module.exports = typeDefs;
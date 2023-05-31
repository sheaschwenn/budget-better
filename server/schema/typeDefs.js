const {gql} = require('apollo-server-express');

const typeDefs = gql`
type User{
    _id: ID
    name: String
    Email: String
    Expenses: [Expense]
    Income: [Income]
    Settings: [Setting]
    Goal: [Goal]
}

type Expense{
    Category: String
    Amount: Number
    Recurring: Boolean
}

type Income{
    Name: String
    Passive: Boolean
    RecurringOrSalary: Boolean
}

type Setting{
    light: Boolean
    currency: String
    language: String
}

type Goal{
    name: String
    AmountToSave: Number
    byDate: String
    ShortTerm: Boolean
}

type Query{
    users: [User]
    user(userId: ID!): User
}

type Mutation{
    createExpense(Category: String, Amount: Number!, Recurring: Boolean!): User
    updateExpense(Category: String, Amount: Number, Recurring: Boolean): User
    deleteExpense(Category: String, Amount: Number!, Recurring: Boolean!): User
}
`
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
    _id: ID
    Category: String
    Amount: Int
    Recurring: Boolean
}

type Income{
    _id: ID
    Name: String
    Passive: Boolean
    RecurringOrSalary: Boolean
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
    AmountToSave: Int
    byDate: String
    ShortTerm: Boolean
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
    addUser(username: String!, email: String!, password: String!): Auth
    createExpense(Category: String!, Amount: Int!, Recurring: Boolean!): User
    updateExpense(_id:ID!, Category: String, Amount: Int, Recurring: Boolean): User
    deleteExpense(_id: ID!): User
    createIncome(  Name: String!, Passive: Boolean!, RecurringOrSalary: Boolean!): User
    updateIncome(_id: ID!, Name: String, Passive: Boolean, RecurringOrSalary: Boolean): User
    deleteIncome(_id: ID!): User
    createGoal(name: String!, AmountToSave: Int!, byDate: String!, ShortTerm: Boolean!): User
    updateGoal(_id: ID!, name: String, AmountToSave: Int, byDate: String, ShortTerm: Boolean): User
    deleteGoal(_id: ID!): User
    updateSetting(_id:ID!, light: Boolean, currency: String, language: String ): User

}
`

module.exports = typeDefs;
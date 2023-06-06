const { gql } = require("apollo-server-express");

const dateScalar = require('./dateScalar')

const typeDefs = gql`
<<<<<<< HEAD
  type User {
    _id: ID
    name: String
    Email: String
    Expenses: [Expense]
    Income: [Income]
    Settings: [Setting]
    Goal: [Goal]
  }
=======
scalar Date
type User{
    _id: ID
    name: String
    email: String
    expenses: [Expense]
    income: [Income]
    settings: [Setting]
    goal: [Goal]
}
>>>>>>> main

  type Expense {
    _id: ID
<<<<<<< HEAD
    Category: String
    Amount: Float!
    Recurring: Boolean
  }
=======
    category: String
    amount: Int
    recurring: Boolean
}
>>>>>>> main

  type Income {
    _id: ID
<<<<<<< HEAD
    Name: String
    Passive: Boolean
    RecurringOrSalary: Boolean
  }
=======
    name: String
    passive: Boolean
    amount: Int
    recurringOrSalary: Boolean
}
>>>>>>> main

  type Setting {
    _id: ID!
    light: Boolean
    currency: String
    language: String
  }

  type Goal {
    _id: ID
    name: String
<<<<<<< HEAD
    AmountToSave: Float!
    byDate: String
    ShortTerm: Boolean
  }
=======
    amountToSave: Int
    byDate: Date
    shortTerm: Boolean
}
>>>>>>> main

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
<<<<<<< HEAD
    addUser(username: String!, email: String!, password: String!): Auth
    createExpense(Category: String!, Amount: Float!, Recurring: Boolean!): User
    updateExpense(
      _id: ID!
      Category: String
      Amount: Float
      Recurring: Boolean
    ): User
    deleteExpense(_id: ID!): User
    createIncome(
      Name: String!
      Passive: Boolean!
      RecurringOrSalary: Boolean!
    ): User
    updateIncome(
      _id: ID!
      Name: String
      Passive: Boolean
      RecurringOrSalary: Boolean
    ): User
    deleteIncome(_id: ID!): User
    createGoal(
      name: String!
      AmountToSave: Float!
      byDate: String!
      ShortTerm: Boolean!
    ): User
    updateGoal(
      _id: ID!
      name: String
      AmountToSave: Float
      byDate: String
      ShortTerm: Boolean
    ): User
=======
    addUser(name: String!, email: String!, password: String!): Auth
    createExpense( category: String!, amount: Float!, recurring: Boolean!): Expense
    updateExpense(_id:ID!, category: String, amount: Float, recurring: Boolean): User
    deleteExpense(_id: ID!): User
    createIncome(  name: String!, passive: Boolean!, amount: Float!, recurringOrSalary: Boolean!): Income
    updateIncome(_id: ID!, name: String, passive: Boolean, amount: Float!, recurringOrSalary: Boolean): User
    deleteIncome(_id: ID!): User
    createGoal(name: String!, amountToSave: Float!, byDate: Date, shortTerm: Boolean!): Goal
    updateGoal(_id: ID!, name: String, amountToSave: Float, byDate: String, shortTerm: Boolean): User
>>>>>>> main
    deleteGoal(_id: ID!): User
    updateSetting(
      _id: ID!
      light: Boolean
      currency: String
      language: String
    ): User
  }
`;

module.exports = typeDefs;

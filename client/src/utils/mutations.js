import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation createExpense($category: String!, $amount: Float!, $recurring: Boolean!) {
    createExpense(category: $category, amount: $amount, recurring: $recurring) {
    
        _id
        category
        amount
        recurring
      
    }
  }
`;

export const UPDATE_SETTING = gql`
  mutation updateSetting($id: ID!, $light: Boolean, $currency: String, $language: String) {
    updateSetting(_id: $id, light: $light, currency: $currency, language: $language) {
      _id
      name
      email
      settings {
        _id
        light
        currency
        language
      }
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation updateExpense($id: ID!, $category: String, $amount: Float, $recurring: Boolean) {
    updateExpense(_id: $id, category: $category, Amount: $amount, recurring: $recurring) {
      _id
      name
      email
      expenses {
        _id
        category
        amount
        recurring
      }
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($id: ID!) {
    deleteExpense(_id: $id) {
      _id
      name
      email
      expenses {
        _id
        category
        amount
        recurring
      }
    }
  }
`;

export const CREATE_INCOME = gql`
  mutation createIncome($name: String!, $passive: Boolean!, $amount: Float!, $recurringOrSalary: Boolean!) {
    createIncome(name: $name, passive: $passive, amount: $amount, recurringOrSalary: $recurringOrSalary) {
     
        _id
        name
        passive
        amount
        recurringOrSalary
      }
  }
`;

export const UPDATE_INCOME = gql`
  mutation updateIncome($id: ID!, $name: String, $passive: Boolean, $recurringOrSalary: Boolean) {
    updateIncome(_id: $id, name: $name, passive: $passive, recurringOrSalary: $recurringOrSalary) {
      _id
      name
      email
      income {
        _id
        name
        passive
        recurringOrSalary
      }
    }
  }
`;

export const DELETE_INCOME = gql`
  mutation deleteIncome($id: ID!) {
    deleteIncome(_id: $id) {
      _id
      name
      email
      income {
        _id
        name
        passive
        recurringOrSalary
      }
    }
  }
`;

export const CREATE_GOAL = gql`
  mutation createGoal($name: String!, $amountToSave: Float!, $byDate: Date, $shortTerm: Boolean!) {
    createGoal(name: $name, amountToSave: $amountToSave, byDate: $byDate, shortTerm: $shortTerm) {
     
        _id
        name
        amountToSave
        byDate
        shortTerm
    }
  }
`;

export const UPDATE_GOAL = gql`
  mutation updateGoal($id: ID!, $name: String, $amountToSave: Float, $byDate: String, $shortTerm: Boolean) {
    updateGoal(_id: $id, name: $name, amountToSave: $amountToSave, byDate: $byDate, shortTerm: $shortTerm) {
      _id
      name
      email
      goal {
        _id
        name
        amountToSave
        byDate
        shortTerm
      }
    }
  }
`;

export const DELETE_GOAL = gql`
  mutation deleteGoal($id: ID!) {
    deleteGoal(_id: $id) {
      _id
      name
      email
      goal {
        _id
        name
        amountToSave
        byDate
        shortTerm
      }
    }
  }
`;
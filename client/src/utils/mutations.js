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
        createdOn
      
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
  mutation updateExpense($expenseId: ID!, $category: String, $amount: Float, $recurring: Boolean) {
    updateExpense(expenseId: $expenseId, category: $category, amount: $amount, recurring: $recurring) {
     
        _id
        category
        amount
        recurring
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($expenseId: ID!) {
    deleteExpense(expenseId: $expenseId) {
     
        _id
        category
        amount
        recurring
    }
  }
`;

export const CREATE_INCOME = gql`
  mutation createIncome($name: String!, $passive: Boolean!, $amount: Float!, $recurring: Boolean!) {
    createIncome(name: $name, passive: $passive, amount: $amount, recurring: $recurring) {
     
        _id
        name
        passive
        amount
        recurring
        createdOn
      }
  }
`;

export const UPDATE_INCOME = gql`
  mutation updateIncome($incomeId: ID!, $name: String, $passive: Boolean,$amount: Float! $recurring: Boolean) {
    updateIncome(incomeId: $incomeId, name: $name, passive: $passive, amount: $amount, recurring: $recurring) {
    
        _id
        name
        passive
        recurring
        amount
        createdOn
    }
  }
`;

export const DELETE_INCOME = gql`
  mutation deleteIncome($incomeId: ID!) {
    deleteIncome(incomeId: $incomeId) {
   
        _id
        name
        passive
        recurring
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
        createdOn
    }
  }
`;

export const UPDATE_GOAL = gql`
  mutation updateGoal($goalId: ID!, $name: String, $amountToSave: Float, $byDate: String, $shortTerm: Boolean) {
    updateGoal(goalId: $goalId, name: $name, amountToSave: $amountToSave, byDate: $byDate, shortTerm: $shortTerm) {
   
        _id
        name
        amountToSave
        byDate
        shortTerm
      
    }
  }
`;

export const DELETE_GOAL = gql`
  mutation deleteGoal($goalId: ID!) {
    deleteGoal(goalId: $goalId) {
     
        _id
        name
        amountToSave
        byDate
        shortTerm
      
    }
  }
`;
import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    me {
      _id
      name
      email
      expenses {
        _id
        category
        amount
        recurring
      }
      income {
        _id
        name
        passive
        recurringOrSalary
      }
      settings {
        _id
        light
        currency
        language
      }
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

export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      name
      email
      expenses {
        _id
        category
        amount
        recurring
      }
      income {
        _id
        name
        passive
        recurringOrSalary
      }
      settings {
        _id
        light
        currency
        language
      }
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

export const GET_EXPENSES = gql`
  query getExpenses {
    me {
      expenses {
        _id
        category
        amount
        recurring
      }
    }
  }
`;

export const GET_INCOME = gql`
  query getIncome {
    me {
      income {
        _id
        name
        amount
        passive
        recurringOrSalary
      }
    }
  }
`;

export const GET_SETTINGS = gql`
  query getSettings {
    me {
      setting {
        _id
        light
        currency
        language
      }
    }
  }
`;

export const GET_GOAL = gql`
  query getGoal {
    me {
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
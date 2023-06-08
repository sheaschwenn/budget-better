import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    me {
      _id
      name
      email
      createdOn
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
        amount
        recurring
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
      Email
      Expenses {
        _id
        Category
        Amount
        Recurring
      }
      Income {
        _id
        Name
        Passive
        Recurring
      }
      Settings {
        _id
        light
        currency
        language
      }
      Goal {
        _id
        name
        AmountToSave
        byDate
        ShortTerm
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
        createdOn
      }
    }
  }
`;

export const GET_INCOME = gql`
  query getIncome {
    me {
      income {
        _id
        amount
      createdOn
      passive
      passive
      name
      recurring
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
        createdOn
      }
    }
  }
`;
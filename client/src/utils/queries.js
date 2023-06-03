import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    me {
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
        RecurringOrSalary
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
        RecurringOrSalary
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
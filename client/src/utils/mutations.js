import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
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
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
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
  }
`;

export const CREATE_EXPENSE = gql`
  mutation createExpense($Category: String!, $Amount: Float!, $Recurring: Boolean!) {
    createExpense(Category: $Category, Amount: $Amount, Recurring: $Recurring) {
      _id
      name
      Email
      Expenses {
        _id
        Category
        Amount
        Recurring
      }
    }
  }
`;

export const UPDATE_SETTING = gql`
  mutation updateSetting($id: ID!, $light: Boolean, $currency: String, $language: String) {
    updateSetting(_id: $id, light: $light, currency: $currency, language: $language) {
      _id
      name
      Email
      Settings {
        _id
        light
        currency
        language
      }
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation updateExpense($id: ID!, $Category: String, $Amount: Float, $Recurring: Boolean) {
    updateExpense(_id: $id, Category: $Category, Amount: $Amount, Recurring: $Recurring) {
      _id
      name
      Email
      Expenses {
        _id
        Category
        Amount
        Recurring
      }
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($id: ID!) {
    deleteExpense(_id: $id) {
      _id
      name
      Email
      Expenses {
        _id
        Category
        Amount
        Recurring
      }
    }
  }
`;

export const CREATE_INCOME = gql`
  mutation createIncome($Name: String!, $Passive: Boolean!, $RecurringOrSalary: Boolean!) {
    createIncome(Name: $Name, Passive: $Passive, RecurringOrSalary: $RecurringOrSalary) {
      _id
      name
      Email
      Income {
        _id
        Name
        Passive
        RecurringOrSalary
      }
    }
  }
`;

export const UPDATE_INCOME = gql`
  mutation updateIncome($id: ID!, $Name: String, $Passive: Boolean, $RecurringOrSalary: Boolean) {
    updateIncome(_id: $id, Name: $Name, Passive: $Passive, RecurringOrSalary: $RecurringOrSalary) {
      _id
      name
      Email
      Income {
        _id
        Name
        Passive
        RecurringOrSalary
      }
    }
  }
`;

export const DELETE_INCOME = gql`
  mutation deleteIncome($id: ID!) {
    deleteIncome(_id: $id) {
      _id
      name
      Email
      Income {
        _id
        Name
        Passive
        RecurringOrSalary
      }
    }
  }
`;

export const CREATE_GOAL = gql`
  mutation createGoal($name: String!, $AmountToSave: Float!, $byDate: String!, $ShortTerm: Boolean!) {
    createGoal(name: $name, AmountToSave: $AmountToSave, byDate: $byDate, ShortTerm: $ShortTerm) {
      _id
      name
      Email
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

export const UPDATE_GOAL = gql`
  mutation updateGoal($id: ID!, $name: String, $AmountToSave: Float, $byDate: String, $ShortTerm: Boolean) {
    updateGoal(_id: $id, name: $name, AmountToSave: $AmountToSave, byDate: $byDate, ShortTerm: $ShortTerm) {
      _id
      name
      Email
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

export const DELETE_GOAL = gql`
  mutation deleteGoal($id: ID!) {
    deleteGoal(_id: $id) {
      _id
      name
      Email
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
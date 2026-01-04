module.exports = {
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100
  },

  TRANSACTION_TYPES: {
    EXPENSE: 'expense',
    INCOME: 'income',
    TRANSFER: 'transfer'
  },

  LOAN_STATUS: {
    ACTIVE: 'active',
    CLOSED: 'closed'
  },

  ACCOUNT_TYPES: {
    SAVINGS: 'savings',
    CURRENT: 'current',
    CASH: 'cash',
    CREDIT: 'credit'
  },

  CURRENCIES: {
    INR: 'INR',
    USD: 'USD'
  },

  ERROR_CODES: {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    AUTH_ERROR: 'AUTH_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    SERVER_ERROR: 'SERVER_ERROR'
  }
}

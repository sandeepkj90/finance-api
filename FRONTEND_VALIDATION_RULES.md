# Frontend Form Validation Rules

This document lists all validated fields for all APIs. Use these rules to implement client-side validation in your frontend forms.

---

## 🔐 AUTH API

### POST /api/auth/login
**Fields to validate:**

| Field | Type | Required | Rules | Example |
|-------|------|----------|-------|---------|
| email | string | ✅ | Valid email format | user@example.com |
| password | string | ✅ | Minimum 6 characters | password123 |

**Frontend Validation:**
```javascript
const loginValidation = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address"
    }
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters"
    }
  }
}
```

### POST /api/auth/refresh
**Fields to validate:**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| refreshToken | string | ✅ | Valid JWT token |

### POST /api/auth/logout
**Fields to validate:**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| refreshToken | string | ✅ | Valid JWT token |

---

## 👤 USER API

### POST /api/users/register
**Fields to validate:**

| Field | Type | Required | Rules | Example |
|-------|------|----------|-------|---------|
| name | string | ✅ | 2-50 characters | John Doe |
| email | string | ✅ | Valid email format | john@example.com |
| password | string | ✅ | Minimum 6 characters | password123 |
| phone | string | ❌ | Maximum 20 characters | +1-234-567-8900 |
| address | string | ❌ | Maximum 200 characters | 123 Main St, City |

**Frontend Validation:**
```javascript
const registerValidation = {
  name: {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters"
    },
    maxLength: {
      value: 50,
      message: "Name must not exceed 50 characters"
    }
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address"
    }
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters"
    }
  },
  phone: {
    maxLength: {
      value: 20,
      message: "Phone number must not exceed 20 characters"
    }
  },
  address: {
    maxLength: {
      value: 200,
      message: "Address must not exceed 200 characters"
    }
  }
}
```

### PUT /api/users/me
**Fields to validate:**

| Field | Type | Required | Rules | Example |
|-------|------|----------|-------|---------|
| name | string | ❌ | 2-50 characters | John Doe Updated |
| email | string | ❌ | Valid email format | newemail@example.com |
| phone | string | ❌ | Maximum 20 characters | +1-234-567-8900 |
| address | string | ❌ | Maximum 200 characters | 456 Oak Ave, City |

### PUT /api/users/me/change-password
**Fields to validate:**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| currentPassword | string | ✅ | Exact match required |
| newPassword | string | ✅ | Minimum 6 characters |

**Frontend Validation:**
```javascript
const changePasswordValidation = {
  currentPassword: {
    required: "Current password is required"
  },
  newPassword: {
    required: "New password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters"
    }
  }
}
```

---

## 💰 BUDGET API

### POST /api/budgets
**Fields to validate:**

| Field | Type | Required | Rules | Example |
|-------|------|----------|-------|---------|
| category | string | ✅ | Must be valid category | Housing & Fixed Commitments |
| limit | number | ✅ | Minimum 1 | 50000 |
| month | number | ✅ | 0-11 (Jan-Dec) | 0 |
| year | number | ✅ | Minimum 2000 | 2026 |

**Valid Categories:**
```javascript
const budgetCategories = [
  'Housing & Fixed Commitments',
  'Utilities & Communication',
  'Groceries & Daily Essentials',
  'Transportation',
  'Subscriptions & Services',
  'Investments & Savings',
  'Personal / Family Expenses',
  'Miscellaneous'
]
```

**Frontend Validation:**
```javascript
const budgetValidation = {
  category: {
    required: "Category is required",
    validate: (value) => 
      budgetCategories.includes(value) || "Invalid category"
  },
  limit: {
    required: "Budget limit is required",
    min: {
      value: 1,
      message: "Budget limit must be greater than 0"
    }
  },
  month: {
    required: "Month is required",
    min: {
      value: 0,
      message: "Month must be between 0 and 11"
    },
    max: {
      value: 11,
      message: "Month must be between 0 and 11"
    }
  },
  year: {
    required: "Year is required",
    min: {
      value: 2000,
      message: "Year must be 2000 or later"
    }
  }
}
```

### PUT /api/budgets/:id
**Fields to validate:** Same as POST (all optional)

### GET /api/budgets Query Parameters
| Parameter | Type | Required | Rules |
|-----------|------|----------|-------|
| month | number | ❌ | 0-11 |
| year | number | ❌ | ≥2000 |

---

## 📈 INVESTMENT API

### POST /api/investments
**Fields to validate:**

| Field | Type | Required | Rules | Example |
|-------|------|----------|-------|---------|
| name | string | ✅ | 2-100 characters | Apple Stock Portfolio |
| type | string | ✅ | Valid investment type | Stocks |
| category | string | ✅ | Valid budget category | Investments & Savings |
| amount | number | ✅ | Minimum 1 | 50000 |
| currentValue | number | ✅ | Minimum 0 | 57500 |
| returns | number | ❌ | Auto-calculated | 7500 |
| date | date | ✅ | ISO format | 2026-01-01 |

**Valid Investment Types:**
```javascript
const investmentTypes = [
  'Stocks',
  'Mutual Fund',
  'Bonds',
  'ETFs',
  'Cryptocurrency',
  'Fixed Deposit'
]
```

**Valid Categories:** (Same as Budget)

**Frontend Validation:**
```javascript
const investmentValidation = {
  name: {
    required: "Investment name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters"
    },
    maxLength: {
      value: 100,
      message: "Name must not exceed 100 characters"
    }
  },
  type: {
    required: "Investment type is required",
    validate: (value) =>
      investmentTypes.includes(value) || "Invalid investment type"
  },
  category: {
    required: "Category is required",
    validate: (value) =>
      budgetCategories.includes(value) || "Invalid category"
  },
  amount: {
    required: "Initial amount is required",
    min: {
      value: 1,
      message: "Amount must be greater than 0"
    }
  },
  currentValue: {
    required: "Current value is required",
    min: {
      value: 0,
      message: "Current value must be 0 or greater"
    }
  },
  date: {
    required: "Date is required",
    validate: (value) => !isNaN(Date.parse(value)) || "Invalid date format"
  }
}
```

### PUT /api/investments/:id
**Fields to validate:** Same as POST (all optional)

### GET /api/investments Query Parameters
| Parameter | Type | Required | Rules |
|-----------|------|----------|-------|
| type | string | ❌ | Valid investment type |
| category | string | ❌ | Valid budget category |
| page | number | ❌ | Default 1 |
| limit | number | ❌ | Default 20 |

---

## 💵 INCOME API

### POST /api/incomes
**Fields to validate:**

| Field | Type | Required | Rules | Example |
|-------|------|----------|-------|---------|
| source | string | ✅ | 2-100 characters | Monthly Salary |
| amount | number | ✅ | Must be positive | 50000 |
| category | string | ✅ | Valid category | Salary |
| paymentMethod | string | ❌ | Valid payment method | Bank Transfer |
| date | date | ✅ | ISO format | 2026-01-07 |
| account | string | ❌ | Maximum 100 characters | Primary Account |

**Valid Payment Methods:**
```javascript
const paymentMethods = [
  'Bank Transfer',
  'Cash',
  'Cheque',
  'Credit Card',
  'Debit Card',
  'Digital Wallet',
  'UPI',
  'Other'
]
```

**Frontend Validation:**
```javascript
const incomeValidation = {
  source: {
    required: "Income source is required",
    minLength: {
      value: 2,
      message: "Source must be at least 2 characters"
    },
    maxLength: {
      value: 100,
      message: "Source must not exceed 100 characters"
    }
  },
  amount: {
    required: "Amount is required",
    min: {
      value: 0.01,
      message: "Amount must be a positive number"
    }
  },
  category: {
    required: "Category is required"
  },
  paymentMethod: {
    validate: (value) =>
      !value || paymentMethods.includes(value) || "Invalid payment method"
  },
  date: {
    required: "Date is required",
    validate: (value) => !isNaN(Date.parse(value)) || "Invalid date format"
  },
  account: {
    maxLength: {
      value: 100,
      message: "Account name must not exceed 100 characters"
    }
  }
}
```

### PUT /api/incomes/:id
**Fields to validate:** Same as POST (all optional)

---

## 💸 EXPENSE API

### POST /api/expenses
**Fields to validate:**

| Field | Type | Required | Rules | Example |
|-------|------|----------|-------|---------|
| description | string | ✅ | Any length | Grocery shopping |
| amount | number | ✅ | Must be positive | 5000 |
| category | string | ✅ | Valid category | Groceries |
| date | date | ✅ | ISO format | 2026-01-07 |
| paymentMethod | string | ✅ | Valid method | Cash |

**Frontend Validation:**
```javascript
const expenseValidation = {
  description: {
    required: "Description is required"
  },
  amount: {
    required: "Amount is required",
    min: {
      value: 0.01,
      message: "Amount must be a positive number"
    }
  },
  category: {
    required: "Category is required"
  },
  date: {
    required: "Date is required",
    validate: (value) => !isNaN(Date.parse(value)) || "Invalid date format"
  },
  paymentMethod: {
    required: "Payment method is required"
  }
}
```

### PUT /api/expenses/:id
**Fields to validate:** Same as POST (all optional)

---

## 🏦 LOAN API

### POST /api/loans
**Fields to validate:**

| Field | Type | Required | Rules | Example |
|-------|------|----------|-------|---------|
| lender | string | ✅ | Any length | SBI Bank |
| amount | number | ✅ | Must be valid | 500000 |
| interestRate | number | ✅ | Must be valid | 8.5 |
| term | number | ✅ | Must be valid | 60 |
| monthlyPayment | number | ✅ | Must be valid | 10000 |
| paidAmount | number | ❌ | Default 0 | 50000 |
| startDate | date | ✅ | ISO format | 2026-01-01 |

**Frontend Validation:**
```javascript
const loanValidation = {
  lender: {
    required: "Lender name is required"
  },
  amount: {
    required: "Loan amount is required",
    min: {
      value: 1,
      message: "Amount must be greater than 0"
    }
  },
  interestRate: {
    required: "Interest rate is required",
    min: {
      value: 0,
      message: "Interest rate must be 0 or greater"
    }
  },
  term: {
    required: "Loan term (months) is required",
    min: {
      value: 1,
      message: "Term must be at least 1 month"
    }
  },
  monthlyPayment: {
    required: "Monthly payment is required",
    min: {
      value: 0.01,
      message: "Payment must be greater than 0"
    }
  },
  paidAmount: {
    min: {
      value: 0,
      message: "Paid amount cannot be negative"
    }
  },
  startDate: {
    required: "Start date is required",
    validate: (value) => !isNaN(Date.parse(value)) || "Invalid date format"
  }
}
```

### PUT /api/loans/:id
**Fields to validate:**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| lender | string | ❌ | Any length |
| amount | number | ❌ | >0 |
| interestRate | number | ❌ | ≥0 |
| term | number | ❌ | ≥1 |
| monthlyPayment | number | ❌ | >0 |
| paidAmount | number | ❌ | ≥0 |
| startDate | date | ❌ | ISO format |
| status | string | ❌ | 'active' or 'Paid Off' |

### POST /api/loans/:id/repayment
**Fields to validate:**

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| amount | number | ✅ | Must be positive |
| date | date | ✅ | ISO format |
| note | string | ❌ | Any length |

---

## 📋 Dropdown/Select Options

### Budget & Investment Categories
```javascript
const categories = [
  'Housing & Fixed Commitments',
  'Utilities & Communication',
  'Groceries & Daily Essentials',
  'Transportation',
  'Subscriptions & Services',
  'Investments & Savings',
  'Personal / Family Expenses',
  'Miscellaneous'
]
```

### Investment Types
```javascript
const investmentTypes = [
  'Stocks',
  'Mutual Fund',
  'Bonds',
  'ETFs',
  'Cryptocurrency',
  'Fixed Deposit'
]
```

### Payment Methods
```javascript
const paymentMethods = [
  'Bank Transfer',
  'Cash',
  'Cheque',
  'Credit Card',
  'Debit Card',
  'Digital Wallet',
  'UPI',
  'Other'
]
```

### Loan Status
```javascript
const loanStatus = [
  'active',
  'Paid Off'
]
```

### Months
```javascript
const months = [
  { value: 0, label: 'January' },
  { value: 1, label: 'February' },
  { value: 2, label: 'March' },
  { value: 3, label: 'April' },
  { value: 4, label: 'May' },
  { value: 5, label: 'June' },
  { value: 6, label: 'July' },
  { value: 7, label: 'August' },
  { value: 8, label: 'September' },
  { value: 9, label: 'October' },
  { value: 10, label: 'November' },
  { value: 11, label: 'December' }
]
```

---

## 🎯 Frontend Implementation Tips

### React Form Example (using React Hook Form)
```javascript
import { useForm } from 'react-hook-form'
import { budgetValidation } from './validations'

export function BudgetForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('category', budgetValidation.category)}
        placeholder="Select Category"
      />
      {errors.category && <span>{errors.category.message}</span>}

      <input
        type="number"
        {...register('limit', budgetValidation.limit)}
        placeholder="Budget Limit"
      />
      {errors.limit && <span>{errors.limit.message}</span>}

      <button type="submit">Create Budget</button>
    </form>
  )
}
```

### Vue Form Example
```vue
<template>
  <form @submit.prevent="submitForm">
    <input 
      v-model="form.category"
      @blur="validateField('category')"
      placeholder="Category"
    />
    <span v-if="errors.category">{{ errors.category }}</span>

    <input 
      type="number"
      v-model="form.limit"
      @blur="validateField('limit')"
      placeholder="Limit"
    />
    <span v-if="errors.limit">{{ errors.limit }}</span>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: { category: '', limit: '' },
      errors: {}
    }
  },
  methods: {
    validateField(field) {
      // Implement validation logic
    }
  }
}
</script>
```

---

## Summary Table

| API | Create | Read | Update | Delete | Query Params |
|-----|--------|------|--------|--------|--------------|
| Auth | ✅ | - | - | - | - |
| User | ✅ | ✅ | ✅ | - | - |
| Budget | ✅ | ✅ | ✅ | ✅ | month, year |
| Investment | ✅ | ✅ | ✅ | ✅ | type, category, page, limit |
| Income | ✅ | ✅ | ✅ | ✅ | - |
| Expense | ✅ | ✅ | ✅ | ✅ | - |
| Loan | ✅ | ✅ | ✅ | ✅ | - |

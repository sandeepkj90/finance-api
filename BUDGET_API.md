# Budget APIs Documentation

## Base URL
```
http://localhost:4000/api/budgets
```

## Authentication
All Budget endpoints require authentication using a Bearer JWT token.

```
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

---

## 📋 Valid Budget Categories

```json
[
  "Housing & Fixed Commitments",
  "Utilities & Communication",
  "Groceries & Daily Essentials",
  "Transportation",
  "Subscriptions & Services",
  "Investments & Savings",
  "Personal / Family Expenses",
  "Miscellaneous"
]
```

---

## 1️⃣ GET /api/budgets

### Description
Retrieve all budgets for the authenticated user (optionally filtered by month/year)

### Query Parameters
| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| month | number | No | Month (0-11, where 0=January) | `0` |
| year | number | No | Year | `2026` |

### Request Example
```bash
curl -X GET "http://localhost:4000/api/budgets?month=0&year=2026" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

### ✅ Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "budgets": [
      {
        "id": "budget_001",
        "userId": "user_123",
        "category": "Housing & Fixed Commitments",
        "limit": 50000,
        "spent": 45000,
        "month": 0,
        "year": 2026,
        "createdAt": "2026-01-01T10:00:00.000Z",
        "updatedAt": "2026-01-06T15:30:00.000Z"
      },
      {
        "id": "budget_002",
        "userId": "user_123",
        "category": "Utilities & Communication",
        "limit": 5000,
        "spent": 3200,
        "month": 0,
        "year": 2026,
        "createdAt": "2026-01-01T10:00:00.000Z",
        "updatedAt": "2026-01-06T15:30:00.000Z"
      }
    ],
    "totalBudgets": 2,
    "totalLimit": 55000,
    "totalSpent": 48200
  }
}
```

### ❌ Error Responses

#### 401 Unauthorized
```json
{
  "error": "Authorization token missing",
  "code": "AUTH_ERROR"
}
```

#### 500 Server Error
```json
{
  "status": "error",
  "code": "SERVER_ERROR",
  "message": "Failed to fetch budgets"
}
```

---

## 2️⃣ POST /api/budgets

### Description
Create a new budget for the authenticated user

### Request Body
```json
{
  "category": "Housing & Fixed Commitments",
  "limit": 50000,
  "month": 0,
  "year": 2026
}
```

### Field Validation
| Field | Type | Required | Min/Max | Rules |
|-------|------|----------|---------|-------|
| category | string | Yes | - | Must be one of valid categories |
| limit | number | Yes | >0 | Budget limit amount |
| month | number | Yes | 0-11 | Month of the year |
| year | number | Yes | ≥2000 | Year value |

### Request Example
```bash
curl -X POST "http://localhost:4000/api/budgets" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Housing & Fixed Commitments",
    "limit": 50000,
    "month": 0,
    "year": 2026
  }'
```

### ✅ Response (201 Created)
```json
{
  "status": "success",
  "code": "BUDGET_CREATED",
  "message": "Budget created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439010",
    "category": "Housing & Fixed Commitments",
    "limit": 50000,
    "spent": 0,
    "month": 0,
    "year": 2026,
    "createdAt": "2026-01-06T16:45:00.000Z",
    "updatedAt": "2026-01-06T16:45:00.000Z"
  }
}
```

### ❌ Error Responses

#### 400 Bad Request - Validation Error
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "errors": {
    "body.category": "category is required",
    "body.limit": "limit is required",
    "body.month": "month is required",
    "body.year": "year is required"
  }
}
```

#### 400 Bad Request - Invalid Limit
```json
{
  "status": "error",
  "code": "INVALID_LIMIT",
  "message": "Budget limit must be greater than 0"
}
```

#### 400 Bad Request - Duplicate Budget
```json
{
  "status": "error",
  "code": "DUPLICATE_BUDGET",
  "message": "Budget for this category already exists for the selected month/year"
}
```

#### 401 Unauthorized
```json
{
  "status": "error",
  "code": "AUTH_ERROR",
  "message": "Authorization token missing"
}
```

---

## 3️⃣ PUT /api/budgets/:id

### Description
Update an existing budget

### URL Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Budget ID (MongoDB ObjectId) |

### Request Body (All fields optional)
```json
{
  "category": "Housing & Fixed Commitments",
  "limit": 55000,
  "month": 0,
  "year": 2026
}
```

### Request Example
```bash
curl -X PUT "http://localhost:4000/api/budgets/507f1f77bcf86cd799439011" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "limit": 55000
  }'
```

### ✅ Response (200 OK)
```json
{
  "status": "success",
  "code": "BUDGET_UPDATED",
  "message": "Budget updated successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439010",
    "category": "Housing & Fixed Commitments",
    "limit": 55000,
    "spent": 45000,
    "month": 0,
    "year": 2026,
    "createdAt": "2026-01-01T10:00:00.000Z",
    "updatedAt": "2026-01-06T17:00:00.000Z"
  }
}
```

### ❌ Error Responses

#### 404 Not Found
```json
{
  "status": "error",
  "code": "NOT_FOUND",
  "message": "Budget with id '507f1f77bcf86cd799439011' not found"
}
```

#### 400 Bad Request - Invalid Limit
```json
{
  "status": "error",
  "code": "INVALID_LIMIT",
  "message": "Budget limit must be greater than 0"
}
```

#### 400 Bad Request - Duplicate Budget
```json
{
  "status": "error",
  "code": "DUPLICATE_BUDGET",
  "message": "Budget for this category already exists for the selected month/year"
}
```

#### 401 Unauthorized - Permission Denied
```json
{
  "status": "error",
  "code": "UNAUTHORIZED",
  "message": "You don't have permission to update this budget"
}
```

---

## 4️⃣ DELETE /api/budgets/:id

### Description
Delete a budget

### URL Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Budget ID (MongoDB ObjectId) |

### Request Example
```bash
curl -X DELETE "http://localhost:4000/api/budgets/507f1f77bcf86cd799439011" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

### ✅ Response (200 OK)
```json
{
  "status": "success",
  "code": "BUDGET_DELETED",
  "message": "Budget deleted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "category": "Housing & Fixed Commitments",
    "deletedAt": "2026-01-06T17:15:00.000Z"
  }
}
```

### ❌ Error Responses

#### 404 Not Found
```json
{
  "status": "error",
  "code": "NOT_FOUND",
  "message": "Budget with id '507f1f77bcf86cd799439011' not found"
}
```

#### 401 Unauthorized - Permission Denied
```json
{
  "status": "error",
  "code": "UNAUTHORIZED",
  "message": "You don't have permission to delete this budget"
}
```

---

## 📝 Implementation Examples

### JavaScript (Fetch API)
```javascript
const token = localStorage.getItem('accessToken');

// Get all budgets
async function getBudgets(month, year) {
  const params = new URLSearchParams();
  if (month !== undefined) params.append('month', month);
  if (year !== undefined) params.append('year', year);

  const response = await fetch(`http://localhost:4000/api/budgets?${params}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}

// Create budget
async function createBudget(category, limit, month, year) {
  const response = await fetch('http://localhost:4000/api/budgets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ category, limit, month, year })
  });
  return response.json();
}

// Update budget
async function updateBudget(budgetId, updates) {
  const response = await fetch(`http://localhost:4000/api/budgets/${budgetId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  return response.json();
}

// Delete budget
async function deleteBudget(budgetId) {
  const response = await fetch(`http://localhost:4000/api/budgets/${budgetId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}
```

### Axios
```javascript
const token = localStorage.getItem('accessToken');
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Get budgets
api.get('/budgets', { params: { month: 0, year: 2026 } });

// Create budget
api.post('/budgets', {
  category: 'Housing & Fixed Commitments',
  limit: 50000,
  month: 0,
  year: 2026
});

// Update budget
api.put('/budgets/budget_id', { limit: 55000 });

// Delete budget
api.delete('/budgets/budget_id');
```

---

## 🔑 API Response Status Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request successful |
| 201 | Created | Budget created successfully |
| 400 | Bad Request | Invalid input or validation error |
| 401 | Unauthorized | Missing/invalid token or no permission |
| 404 | Not Found | Budget not found |
| 500 | Internal Server Error | Server error |

---

## 🛡️ Authorization & Security

- **Authentication**: All endpoints require JWT Bearer token in Authorization header
- **User Isolation**: Users can only access their own budgets
- **Data Validation**: All inputs are validated server-side
- **Uniqueness**: Only one budget per category/month/year per user

---

## 💡 Usage Tips

1. **Month values**: January=0, February=1, ..., December=11
2. **Empty filters**: Both month and year are optional for GET requests
3. **Update flexibility**: You can update individual fields without sending all fields
4. **Spent tracking**: The `spent` field is auto-managed by the system
5. **Error handling**: Always check `status` and `code` fields in response

---

## 📊 Example Budget Setup

```javascript
// Create budgets for January 2026
const budgets = [
  { category: 'Housing & Fixed Commitments', limit: 50000, month: 0, year: 2026 },
  { category: 'Utilities & Communication', limit: 5000, month: 0, year: 2026 },
  { category: 'Groceries & Daily Essentials', limit: 10000, month: 0, year: 2026 },
  { category: 'Transportation', limit: 8000, month: 0, year: 2026 },
  { category: 'Subscriptions & Services', limit: 3000, month: 0, year: 2026 },
  { category: 'Investments & Savings', limit: 25000, month: 0, year: 2026 },
  { category: 'Personal / Family Expenses', limit: 15000, month: 0, year: 2026 },
  { category: 'Miscellaneous', limit: 5000, month: 0, year: 2026 }
];

// Total budget: 121,000
```

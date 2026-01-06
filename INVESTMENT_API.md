# Investment APIs Documentation

## Base URL
```
http://localhost:4000/api/investments
```

## Authentication
All Investment endpoints require authentication using a Bearer JWT token.

```
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

---

## 📋 Valid Investment Types

```json
[
  "Stocks",
  "Mutual Fund",
  "Bonds",
  "ETFs",
  "Cryptocurrency"
]
```

## 📋 Valid Investment Categories

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

## 1️⃣ GET /api/investments

### Description
Retrieve all investments for the authenticated user (with optional filtering by type/category)

### Query Parameters
| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| type | string | No | Investment type | `Stocks` |
| category | string | No | Budget category | `Investments & Savings` |
| page | number | No | Page number (default: 1) | `1` |
| limit | number | No | Items per page (default: 20) | `20` |

### Request Example
```bash
curl -X GET "http://localhost:4000/api/investments?type=Stocks&category=Investments%20%26%20Savings&page=1&limit=20" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

### ✅ Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "investments": [
      {
        "id": "507f1f77bcf86cd799439011",
        "userId": "507f1f77bcf86cd799439010",
        "name": "Apple Stock Portfolio",
        "type": "Stocks",
        "category": "Investments & Savings",
        "amount": 50000,
        "currentValue": 57500,
        "returns": 7500,
        "date": "2026-01-01T00:00:00.000Z",
        "createdAt": "2026-01-06T10:30:00.000Z",
        "updatedAt": "2026-01-06T15:30:00.000Z"
      },
      {
        "id": "507f1f77bcf86cd799439012",
        "userId": "507f1f77bcf86cd799439010",
        "name": "Vanguard Mutual Fund",
        "type": "Mutual Fund",
        "category": "Investments & Savings",
        "amount": 30000,
        "currentValue": 31200,
        "returns": 1200,
        "date": "2025-12-15T00:00:00.000Z",
        "createdAt": "2026-01-05T09:15:00.000Z",
        "updatedAt": "2026-01-06T14:20:00.000Z"
      }
    ],
    "total": 2,
    "page": 1,
    "limit": 20,
    "pages": 1
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

---

## 2️⃣ POST /api/investments

### Description
Create a new investment for the authenticated user

### Request Body
```json
{
  "name": "Apple Stock Portfolio",
  "type": "Stocks",
  "category": "Investments & Savings",
  "amount": 50000,
  "currentValue": 57500,
  "date": "2026-01-01"
}
```

### Field Validation
| Field | Type | Required | Min/Max | Rules |
|-------|------|----------|---------|-------|
| name | string | Yes | 2-100 | Investment name |
| type | string | Yes | - | Must be one of valid types |
| category | string | Yes | - | Must be one of valid categories |
| amount | number | Yes | >0 | Initial investment amount |
| currentValue | number | Yes | ≥0 | Current value |
| returns | number | No | - | Auto-calculated (currentValue - amount) |
| date | date | Yes | - | ISO format date |

### Request Example
```bash
curl -X POST "http://localhost:4000/api/investments" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Apple Stock Portfolio",
    "type": "Stocks",
    "category": "Investments & Savings",
    "amount": 50000,
    "currentValue": 57500,
    "date": "2026-01-01"
  }'
```

### ✅ Response (201 Created)
```json
{
  "status": "success",
  "code": "INVESTMENT_CREATED",
  "message": "Investment created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439010",
    "name": "Apple Stock Portfolio",
    "type": "Stocks",
    "category": "Investments & Savings",
    "amount": 50000,
    "currentValue": 57500,
    "returns": 7500,
    "date": "2026-01-01T00:00:00.000Z",
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
    "body.name": "name is required",
    "body.type": "type must be one of [Stocks, Mutual Fund, Bonds, ETFs, Cryptocurrency]",
    "body.category": "category must be one of valid categories",
    "body.amount": "amount must be greater than 0",
    "body.currentValue": "currentValue must be greater than or equal to 0"
  }
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

## 3️⃣ GET /api/investments/:id

### Description
Get a specific investment by ID

### URL Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Investment ID (MongoDB ObjectId) |

### Request Example
```bash
curl -X GET "http://localhost:4000/api/investments/507f1f77bcf86cd799439011" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

### ✅ Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439010",
    "name": "Apple Stock Portfolio",
    "type": "Stocks",
    "category": "Investments & Savings",
    "amount": 50000,
    "currentValue": 57500,
    "returns": 7500,
    "date": "2026-01-01T00:00:00.000Z",
    "createdAt": "2026-01-06T10:30:00.000Z",
    "updatedAt": "2026-01-06T15:30:00.000Z"
  }
}
```

### ❌ Error Responses

#### 404 Not Found
```json
{
  "status": "error",
  "code": "NOT_FOUND",
  "message": "Investment with id '507f1f77bcf86cd799439011' not found"
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

## 4️⃣ PUT /api/investments/:id

### Description
Update an existing investment

### URL Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Investment ID (MongoDB ObjectId) |

### Request Body (All fields optional)
```json
{
  "name": "Apple Stock Portfolio - Updated",
  "type": "Stocks",
  "category": "Investments & Savings",
  "amount": 50000,
  "currentValue": 60000,
  "date": "2026-01-01"
}
```

### Request Example
```bash
curl -X PUT "http://localhost:4000/api/investments/507f1f77bcf86cd799439011" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "currentValue": 60000
  }'
```

### ✅ Response (200 OK)
```json
{
  "status": "success",
  "code": "INVESTMENT_UPDATED",
  "message": "Investment updated successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439010",
    "name": "Apple Stock Portfolio",
    "type": "Stocks",
    "category": "Investments & Savings",
    "amount": 50000,
    "currentValue": 60000,
    "returns": 10000,
    "date": "2026-01-01T00:00:00.000Z",
    "createdAt": "2026-01-06T10:30:00.000Z",
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
  "message": "Investment with id '507f1f77bcf86cd799439011' not found"
}
```

#### 400 Bad Request - Invalid Type/Category
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "errors": {
    "body.type": "type must be one of [Stocks, Mutual Fund, Bonds, ETFs, Cryptocurrency]"
  }
}
```

#### 401 Unauthorized
```json
{
  "status": "error",
  "code": "UNAUTHORIZED",
  "message": "You don't have permission to update this investment"
}
```

---

## 5️⃣ DELETE /api/investments/:id

### Description
Delete an investment

### URL Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Investment ID (MongoDB ObjectId) |

### Request Example
```bash
curl -X DELETE "http://localhost:4000/api/investments/507f1f77bcf86cd799439011" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

### ✅ Response (200 OK)
```json
{
  "status": "success",
  "code": "INVESTMENT_DELETED",
  "message": "Investment deleted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Apple Stock Portfolio",
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
  "message": "Investment with id '507f1f77bcf86cd799439011' not found"
}
```

#### 401 Unauthorized - Permission Denied
```json
{
  "status": "error",
  "code": "UNAUTHORIZED",
  "message": "You don't have permission to delete this investment"
}
```

---

## 📝 Implementation Examples

### JavaScript (Fetch API)
```javascript
const token = localStorage.getItem('accessToken');

// Get all investments
async function getInvestments(type = null, category = null) {
  const params = new URLSearchParams();
  if (type) params.append('type', type);
  if (category) params.append('category', category);

  const response = await fetch(`http://localhost:4000/api/investments?${params}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}

// Create investment
async function createInvestment(name, type, category, amount, currentValue, date) {
  const response = await fetch('http://localhost:4000/api/investments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, type, category, amount, currentValue, date })
  });
  return response.json();
}

// Get investment by ID
async function getInvestment(investmentId) {
  const response = await fetch(`http://localhost:4000/api/investments/${investmentId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}

// Update investment
async function updateInvestment(investmentId, updates) {
  const response = await fetch(`http://localhost:4000/api/investments/${investmentId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  return response.json();
}

// Delete investment
async function deleteInvestment(investmentId) {
  const response = await fetch(`http://localhost:4000/api/investments/${investmentId}`, {
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

// Get investments
api.get('/investments', { 
  params: { type: 'Stocks', category: 'Investments & Savings' } 
});

// Create investment
api.post('/investments', {
  name: 'Apple Stock Portfolio',
  type: 'Stocks',
  category: 'Investments & Savings',
  amount: 50000,
  currentValue: 57500,
  date: '2026-01-01'
});

// Get single investment
api.get('/investments/investment_id');

// Update investment
api.put('/investments/investment_id', { 
  currentValue: 60000 
});

// Delete investment
api.delete('/investments/investment_id');
```

---

## 🔑 API Response Status Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request successful |
| 201 | Created | Investment created successfully |
| 400 | Bad Request | Invalid input or validation error |
| 401 | Unauthorized | Missing/invalid token or no permission |
| 404 | Not Found | Investment not found |
| 500 | Internal Server Error | Server error |

---

## 🛡️ Authorization & Security

- **Authentication**: All endpoints require JWT Bearer token in Authorization header
- **User Isolation**: Users can only access/modify their own investments
- **Data Validation**: All inputs are validated server-side
- **Returns Auto-calculation**: Returns field is automatically calculated as (currentValue - amount)
- **Authorization Checks**: Users cannot update/delete investments they don't own

---

## 💡 Usage Tips

1. **Returns Calculation**: The `returns` field is automatically calculated (currentValue - amount)
2. **Pagination**: Use `page` and `limit` for efficient data retrieval
3. **Filtering**: Filter by `type` or `category` for specific investments
4. **Date Format**: Use ISO format (YYYY-MM-DD) for dates
5. **Update flexibility**: You can update individual fields without sending all fields
6. **Returns Update**: When updating amount or currentValue, returns is recalculated automatically

---

## 📊 Investment Types & Categories

### Types
- **Stocks**: Individual stock investments
- **Mutual Fund**: Managed fund investments
- **Bonds**: Fixed income securities
- **ETFs**: Exchange-traded funds
- **Cryptocurrency**: Digital currency investments

### Categories
Same as Budget categories for better financial organization:
- Housing & Fixed Commitments
- Utilities & Communication
- Groceries & Daily Essentials
- Transportation
- Subscriptions & Services
- Investments & Savings
- Personal / Family Expenses
- Miscellaneous

---

## 📈 Example Investment Portfolio

```javascript
// Create diverse investments
const investments = [
  {
    name: 'Apple Stock Portfolio',
    type: 'Stocks',
    category: 'Investments & Savings',
    amount: 50000,
    currentValue: 57500,
    date: '2026-01-01'
  },
  {
    name: 'Vanguard Index Fund',
    type: 'Mutual Fund',
    category: 'Investments & Savings',
    amount: 30000,
    currentValue: 31200,
    date: '2025-12-15'
  },
  {
    name: 'Government Bonds',
    type: 'Bonds',
    category: 'Investments & Savings',
    amount: 20000,
    currentValue: 20600,
    date: '2025-11-01'
  },
  {
    name: 'Bitcoin Investment',
    type: 'Cryptocurrency',
    category: 'Investments & Savings',
    amount: 10000,
    currentValue: 12500,
    date: '2025-10-20'
  }
];

// Total investment: 110,000
// Total current value: 121,800
// Total returns: 11,800
```

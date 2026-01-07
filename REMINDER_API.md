# 📌 Reminder Module – Complete API Documentation

The Reminder module provides functionality to manage EMI reminders, event reminders, subscriptions, and other recurring payment notifications.

---

## 🔧 Base URL
```
/api/reminders
```

---

## 📋 Endpoints Overview

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 1 | POST | `/` | Create Reminder |
| 2 | GET | `/` | Get All Reminders |
| 3 | GET | `/dashboard` | Get Dashboard Reminders |
| 4 | GET | `/:id` | Get Single Reminder |
| 5 | PUT | `/:id` | Update Reminder |
| 6 | PATCH | `/:id/pause` | Pause Reminder |
| 7 | PATCH | `/:id/resume` | Resume Reminder |
| 8 | PATCH | `/:id/complete` | Complete Reminder |
| 9 | DELETE | `/:id` | Delete Reminder |

---

## 1️⃣ Create Reminder

### ➤ Endpoint
```
POST /api/reminders
```

### ➤ Authentication
Required (Bearer Token)

### ➤ Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | ✅ | Reminder title (e.g., "Home Loan EMI") |
| description | string | ❌ | Additional details |
| type | string | ✅ | `LOAN_EMI`, `CREDIT_CARD`, `SUBSCRIPTION`, `RENT`, `INSURANCE`, `CUSTOM` |
| amount | number | ❌ | Payment amount |
| startDate | date | ✅ | ISO date format (YYYY-MM-DD) |
| endDate | date | ✅ | ISO date format (YYYY-MM-DD) |
| reminderDay | number | ✅ | Day of month (1-31) |
| frequency | string | ✅ | `MONTHLY`, `YEARLY`, `ONCE` |

### ➤ Request Payload Example

```json
{
  "title": "Home Loan EMI",
  "description": "HDFC Home Loan",
  "type": "LOAN_EMI",
  "amount": 28500,
  "startDate": "2024-02-05",
  "endDate": "2039-02-05",
  "reminderDay": 5,
  "frequency": "MONTHLY"
}
```

### ➤ Response (201 Created)

```json
{
  "success": true,
  "message": "Reminder created successfully",
  "data": {
    "id": "65ac23f8b4d2e5a0c7f9e2a1",
    "status": "ACTIVE"
  }
}
```

### ➤ Error Responses

```json
// 400 Bad Request - Validation Error
{
  "error": "Validation failed",
  "details": [
    {
      "field": "reminderDay",
      "message": "must be between 1 and 31"
    }
  ]
}
```

---

## 2️⃣ Get All Reminders

### ➤ Endpoint
```
GET /api/reminders
```

### ➤ Authentication
Required (Bearer Token)

### ➤ Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| status | string | Filter by status | `ACTIVE`, `PAUSED`, `COMPLETED` |
| type | string | Filter by type | `LOAN_EMI`, `CREDIT_CARD` |
| page | number | Page number (default: 1) | `?page=1` |
| limit | number | Items per page (default: 20) | `?limit=20` |

### ➤ Example Requests

```
/api/reminders
/api/reminders?status=ACTIVE&type=LOAN_EMI
/api/reminders?status=PAUSED&page=2&limit=10
```

### ➤ Response (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "_id": "65ac23f8b4d2e5a0c7f9e2a1",
      "userId": "65ab12f8b4d2e5a0c7f9e0a1",
      "title": "Home Loan EMI",
      "type": "LOAN_EMI",
      "amount": 28500,
      "frequency": "MONTHLY",
      "reminderDay": 5,
      "status": "ACTIVE",
      "startDate": "2024-02-05T00:00:00.000Z",
      "endDate": "2039-02-05T00:00:00.000Z",
      "description": "HDFC Home Loan",
      "createdAt": "2024-12-15T10:30:00.000Z",
      "updatedAt": "2024-12-15T10:30:00.000Z"
    },
    {
      "_id": "65ac23f8b4d2e5a0c7f9e2a2",
      "userId": "65ab12f8b4d2e5a0c7f9e0a1",
      "title": "Credit Card Payment",
      "type": "CREDIT_CARD",
      "amount": 15000,
      "frequency": "MONTHLY",
      "reminderDay": 20,
      "status": "ACTIVE",
      "startDate": "2024-01-01T00:00:00.000Z",
      "endDate": "2026-12-31T00:00:00.000Z",
      "description": "HDFC Credit Card",
      "createdAt": "2024-12-15T10:30:00.000Z",
      "updatedAt": "2024-12-15T10:30:00.000Z"
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 20
}
```

---

## 3️⃣ Get Dashboard Reminders (On App Open 🔥)

### ➤ Endpoint
```
GET /api/reminders/dashboard
```

### ➤ Authentication
Required (Bearer Token)

### ➤ Logic

Returns reminders where:
- `startDate` ≤ today
- `endDate` ≥ today
- `reminderDay` = today's date
- `status` = `ACTIVE`

This endpoint returns only due reminders for the current day.

### ➤ Response (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "id": "65ac23f8b4d2e5a0c7f9e2a1",
      "title": "Home Loan EMI",
      "type": "LOAN_EMI",
      "amount": 28500,
      "dueDate": "2026-01-05"
    }
  ]
}
```

### ➤ Response (No Reminders)

```json
{
  "success": true,
  "data": []
}
```

---

## 4️⃣ Get Single Reminder

### ➤ Endpoint
```
GET /api/reminders/:id
```

### ➤ Authentication
Required (Bearer Token)

### ➤ Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Reminder ID (ObjectId) |

### ➤ Response (200 OK)

```json
{
  "success": true,
  "data": {
    "_id": "65ac23f8b4d2e5a0c7f9e2a1",
    "userId": "65ab12f8b4d2e5a0c7f9e0a1",
    "title": "Home Loan EMI",
    "description": "HDFC Home Loan",
    "type": "LOAN_EMI",
    "amount": 28500,
    "startDate": "2024-02-05T00:00:00.000Z",
    "endDate": "2039-02-05T00:00:00.000Z",
    "reminderDay": 5,
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "createdAt": "2024-12-15T10:30:00.000Z",
    "updatedAt": "2024-12-15T10:30:00.000Z"
  }
}
```

### ➤ Error Response (404 Not Found)

```json
{
  "error": "Reminder not found"
}
```

---

## 5️⃣ Update Reminder

### ➤ Endpoint
```
PUT /api/reminders/:id
```

### ➤ Authentication
Required (Bearer Token)

### ➤ Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Reminder ID (ObjectId) |

### ➤ Request Body (All fields are optional)

```json
{
  "title": "Updated Home Loan EMI",
  "description": "HDFC Home Loan - Updated",
  "amount": 29500,
  "reminderDay": 6,
  "frequency": "MONTHLY"
}
```

### ➤ Response (200 OK)

```json
{
  "success": true,
  "message": "Reminder updated successfully",
  "data": {
    "_id": "65ac23f8b4d2e5a0c7f9e2a1",
    "userId": "65ab12f8b4d2e5a0c7f9e0a1",
    "title": "Updated Home Loan EMI",
    "description": "HDFC Home Loan - Updated",
    "type": "LOAN_EMI",
    "amount": 29500,
    "startDate": "2024-02-05T00:00:00.000Z",
    "endDate": "2039-02-05T00:00:00.000Z",
    "reminderDay": 6,
    "frequency": "MONTHLY",
    "status": "ACTIVE",
    "createdAt": "2024-12-15T10:30:00.000Z",
    "updatedAt": "2024-12-15T11:45:00.000Z"
  }
}
```

---

## 6️⃣ Pause Reminder

### ➤ Endpoint
```
PATCH /api/reminders/:id/pause
```

### ➤ Authentication
Required (Bearer Token)

### ➤ Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Reminder ID (ObjectId) |

### ➤ Request Body

```json
{
  "status": "PAUSED"
}
```

### ➤ Response (200 OK)

```json
{
  "success": true,
  "message": "Reminder paused"
}
```

---

## 7️⃣ Resume Reminder

### ➤ Endpoint
```
PATCH /api/reminders/:id/resume
```

### ➤ Authentication
Required (Bearer Token)

### ➤ Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Reminder ID (ObjectId) |

### ➤ Request Body

```json
{
  "status": "ACTIVE"
}
```

### ➤ Response (200 OK)

```json
{
  "success": true,
  "message": "Reminder active"
}
```

---

## 8️⃣ Complete Reminder

### ➤ Endpoint
```
PATCH /api/reminders/:id/complete
```

### ➤ Authentication
Required (Bearer Token)

### ➤ Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Reminder ID (ObjectId) |

### ➤ Request Body

```json
{
  "status": "COMPLETED"
}
```

### ➤ Response (200 OK)

```json
{
  "success": true,
  "message": "Reminder completed"
}
```

---

## 9️⃣ Delete Reminder

### ➤ Endpoint
```
DELETE /api/reminders/:id
```

### ➤ Authentication
Required (Bearer Token)

### ➤ Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Reminder ID (ObjectId) |

### ➤ Response (200 OK)

```json
{
  "success": true,
  "message": "Reminder deleted successfully"
}
```

### ➤ Error Response (404 Not Found)

```json
{
  "error": "Reminder not found"
}
```

---

## 📊 Data Models

### Reminder Type Enum

```typescript
REMINDER_TYPE = [
  "LOAN_EMI",
  "CREDIT_CARD",
  "SUBSCRIPTION",
  "RENT",
  "INSURANCE",
  "CUSTOM"
]
```

### Frequency Enum

```typescript
FREQUENCY = [
  "MONTHLY",
  "YEARLY",
  "ONCE"
]
```

### Status Enum

```typescript
STATUS = [
  "ACTIVE",
  "PAUSED",
  "COMPLETED"
]
```

### Full Reminder Schema

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  description: String,
  type: String (enum),
  amount: Number,
  startDate: Date,
  endDate: Date,
  reminderDay: Number (1-31),
  frequency: String (enum),
  status: String (enum, default: ACTIVE),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication

All endpoints require Bearer token authentication in the header:

```
Authorization: Bearer <your_jwt_token>
```

---

## ⚠️ Common Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Reminder successfully created |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - Missing or invalid token |
| 404 | Not Found - Reminder not found |
| 500 | Server Error |

---

## 🧪 Testing with cURL

### Create Reminder
```bash
curl -X POST http://localhost:5000/api/reminders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Home Loan EMI",
    "description": "HDFC Home Loan",
    "type": "LOAN_EMI",
    "amount": 28500,
    "startDate": "2024-02-05",
    "endDate": "2039-02-05",
    "reminderDay": 5,
    "frequency": "MONTHLY"
  }'
```

### Get All Reminders
```bash
curl -X GET http://localhost:5000/api/reminders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Dashboard Reminders
```bash
curl -X GET http://localhost:5000/api/reminders/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Reminder
```bash
curl -X PUT http://localhost:5000/api/reminders/:id \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 29500,
    "reminderDay": 6
  }'
```

### Pause Reminder
```bash
curl -X PATCH http://localhost:5000/api/reminders/:id/pause \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Delete Reminder
```bash
curl -X DELETE http://localhost:5000/api/reminders/:id \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📝 Frontend Integration Notes

### Dashboard Widget Implementation

The `/dashboard` endpoint is designed for the main dashboard widget. It returns only reminders due today:

```javascript
// Pseudo-code
useEffect(() => {
  fetch('/api/reminders/dashboard', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => setDueTodayReminders(data.data))
}, [])
```

### Reminder Menu Page Implementation

Use the `/` endpoint with optional filters:

```javascript
// Get all active reminders
fetch('/api/reminders?status=ACTIVE', {
  headers: { 'Authorization': `Bearer ${token}` }
})

// Filter by type
fetch('/api/reminders?type=LOAN_EMI&status=ACTIVE', {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

---

## ✅ Complete Feature Checklist

- ✅ Create Reminder with validation
- ✅ List all reminders with filtering
- ✅ Get dashboard reminders (due today)
- ✅ Get single reminder for editing
- ✅ Update reminder details
- ✅ Pause/Resume reminders
- ✅ Complete reminders
- ✅ Delete reminders
- ✅ User isolation (userId filtering)
- ✅ Timestamp tracking (createdAt, updatedAt)

---

## 🚀 Ready for Production

This API module is production-ready with:
- Input validation using Joi
- User authentication checks
- Proper error handling
- Consistent response format
- RESTful design patterns
- Comprehensive documentation

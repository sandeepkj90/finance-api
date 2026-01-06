# User Update API Documentation

## Endpoint: Update User Profile

### Basic Info
- **Method**: `PUT`
- **Route**: `/api/users/me`
- **Authentication**: Required (Bearer Token)
- **Content-Type**: `application/json`

---

## Request

### Headers
```
Authorization: Bearer <JWT_ACCESS_TOKEN>
Content-Type: application/json
```

### Request Body
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

### Validation Rules
| Field | Type | Required | Min | Max | Rules |
|-------|------|----------|-----|-----|-------|
| name | string | No | 2 | 50 | Must be 2-50 characters |
| email | string | No | - | - | Must be valid email format |

### Notes
- At least one field must be provided
- Both fields are optional, you can update either one or both
- Email must be unique across the system
- Name and email are trimmed and processed before validation

---

## Response

### Success Response (200 OK)
```json
{
  "_id": "67777f8e2c3e4d5a9f1b2c3d",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2025-06-15T10:30:00.000Z",
  "updatedAt": "2026-01-06T14:45:23.000Z",
  "__v": 0
}
```

### Error Responses

#### 400 Bad Request - Validation Error
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "name",
      "message": "name must be a string"
    }
  ]
}
```

#### 401 Unauthorized - Missing/Invalid Token
```json
{
  "error": "Authorization token missing",
  "code": "AUTH_ERROR"
}
```

OR

```json
{
  "error": "Invalid or expired token",
  "code": "AUTH_ERROR"
}
```

#### 404 Not Found - User Doesn't Exist
```json
{
  "error": "User not found"
}
```

#### 409 Conflict - Email Already in Use
```json
{
  "error": "Email already in use by another user",
  "code": "EMAIL_EXISTS"
}
```

---

## Usage Examples

### cURL
```bash
curl -X PUT http://localhost:4000/api/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com"
  }'
```

### JavaScript (Fetch)
```javascript
const token = localStorage.getItem('accessToken');

fetch('http://localhost:4000/api/users/me', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john.doe@example.com'
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
```

### JavaScript (Axios)
```javascript
const token = localStorage.getItem('accessToken');

axios.put('http://localhost:4000/api/users/me', {
  name: 'John Doe',
  email: 'john.doe@example.com'
}, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(res => console.log(res.data))
.catch(err => console.error(err));
```

### Postman
1. Set method to **PUT**
2. URL: `http://localhost:4000/api/users/me`
3. Headers:
   - Key: `Authorization`, Value: `Bearer <your_token>`
   - Key: `Content-Type`, Value: `application/json`
4. Body (raw JSON):
   ```json
   {
     "name": "John Doe",
     "email": "john.doe@example.com"
   }
   ```

---

## Flow Diagram

```
PUT /api/users/me
    ↓
Validate Authorization Header
    ↓ (Invalid)
Return 401 Unauthorized
    ↓ (Valid)
Parse JWT Token
    ↓
Extract User ID
    ↓
Validate Request Body
    ↓ (Invalid)
Return 400 Bad Request
    ↓ (Valid)
Check if email exists (if provided)
    ↓ (Email exists)
Return 409 Conflict
    ↓ (OK)
Update User in Database
    ↓
Return Updated User Profile (200 OK)
```

---

## Related Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/users/register` | Register new user | No |
| GET | `/api/users/me` | Get current user profile | Yes |
| PUT | `/api/users/me/change-password` | Change user password | Yes |

---

## Implementation Details

### Service Layer (user.service.js)
- Checks for email uniqueness before update
- Uses `findByIdAndUpdate` for atomic operations
- Excludes `passwordHash` and `refreshToken` from response
- Validates data according to schema

### Validation Layer (user.validation.js)
- Uses Joi for schema validation
- Name: 2-50 characters
- Email: Valid email format
- Both fields optional

### Controller Layer (user.controller.js)
- Extracts user ID from JWT token
- Passes data to service
- Handles errors through middleware
- Returns sanitized user data

---

## Security Considerations

1. **Authentication**: JWT Bearer token required
2. **Authorization**: Users can only update their own profile
3. **Password Protection**: Password is never returned or exposed
4. **Email Uniqueness**: Enforced at database level with unique index
5. **Input Validation**: All inputs validated before processing
6. **Data Sanitization**: Name and email trimmed/lowercased

---

## Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | User updated successfully |
| 400 | Bad Request | Validation error in request body |
| 401 | Unauthorized | Missing or invalid authentication token |
| 404 | Not Found | User not found |
| 409 | Conflict | Email already in use |
| 500 | Internal Server Error | Server error |

---

## Testing Tips

1. **Get a valid token**: Register or login first
2. **Test partial updates**: Send only `name` or `email`
3. **Test validation**: Send invalid email or short name
4. **Test email uniqueness**: Try updating to existing email
5. **Test without auth**: Remove Authorization header
6. **Test expired token**: Use an old token

---

## Notes

- All timestamps are in UTC ISO 8601 format
- The user ID cannot be modified
- Passwords cannot be updated via this endpoint (use `/me/change-password`)
- The response doesn't include sensitive fields
- Updates are immediate and atomic

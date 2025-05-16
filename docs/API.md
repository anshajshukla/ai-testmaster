# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

### Login
```http
POST /auth/login
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### Register
```http
POST /auth/register
```

Request body:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

## Payments

### Process Payment
```http
POST /payments
```

Request body:
```json
{
  "amount": 100.00,
  "currency": "USD",
  "cardNumber": "4111111111111111",
  "cardHolderName": "John Doe",
  "expiryDate": "12/25",
  "cvv": "123"
}
```

Response:
```json
{
  "id": "payment_id",
  "status": "success",
  "amount": 100.00,
  "currency": "USD",
  "timestamp": "2024-03-16T12:00:00Z"
}
```

### Get Transactions
```http
GET /transactions
```

Response:
```json
{
  "transactions": [
    {
      "id": "transaction_id",
      "amount": 100.00,
      "currency": "USD",
      "status": "success",
      "timestamp": "2024-03-16T12:00:00Z",
      "cardNumber": "****1111"
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "message": "Detailed error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing token"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "error": "Server Error",
  "message": "Internal server error"
}
```

## Rate Limiting

- 100 requests per minute per IP
- Rate limit headers included in response:
  - X-RateLimit-Limit
  - X-RateLimit-Remaining
  - X-RateLimit-Reset

## Security

- All endpoints except login and register require authentication
- JWT token must be included in Authorization header:
  ```
  Authorization: Bearer <token>
  ```
- HTTPS required in production
- Input validation on all endpoints
- CORS enabled for frontend domain 
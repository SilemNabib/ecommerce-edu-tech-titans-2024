## Order Endpoints

These endpoints handle order creation, payment processing, and order retrieval.

### 1. Create PayPal Order
Endpoint: POST `/api/v1/checkout/paypal`

This endpoint initiates a PayPal order for checkout.

**URL:** `/api/v1/checkout/paypal`  
**Method:** `POST`  
**Authentication:** Bearer Token required

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "addressId": "<UUID of the address>"
}
```

**Example Request:**
```http
POST http://127.0.0.1/api/v1/checkout/paypal HTTP/1.1
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "addressId": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "<PayPal Order ID>",
    "status": "<PayPal Order Status>",
    "orderId": "<UUID of the created order>"
  }
}
```

---

### 2. Capture PayPal Order Status
Endpoint: GET `/api/v1/checkout/status`

This endpoint captures the status of a PayPal order.

**URL:** `/api/v1/checkout/status`  
**Method:** `GET`  
**Authentication:** Bearer Token required

**Headers:**
- `Authorization: Bearer <token>`


**Example Request:**
```http
GET http://127.0.0.1/api/v1/checkout/status?order=123e4567-e89b-12d3-a456-426614174000 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "status": "<Order Status>",
  "platformStatus": "<PayPal Status>",
  "orderId": "<UUID of the order>",
  "paymentId": "<PayPal Order ID>"
}
```

---

### 3. Get User Orders
Endpoint: GET `/api/v1/order/get/{page}`

This endpoint retrieves a paginated list of orders for the authenticated user.

**URL:** `/api/v1/order/get/{page}`  
**Method:** `GET`  
**Authentication:** Bearer Token required

**Headers:**
- `Authorization: Bearer <token>`


**Example Request:**
```http
GET http://127.0.0.1/api/v1/order/get/0 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "The following user orders were found",
  "data": {
    "content": [
      {
        "id": "<UUID>",
        "address": "<Address string>",
        "paymentMethod": "<Payment method>",
        "creationDate": "<ISO 8601 date>",
        "shippingPrice": "<Decimal>",
        "totalPrice": "<Decimal>",
        "orderStatus": "<Order status>",
        "inventory": [
          {
            "id": "<Inventory ID>",
            "productName": "<Product name>",
            "color": "<Color name>",
            "size": "<Size>",
            "amount": "<Integer>"
          }
        ]
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 5,
      "sort": {
        "sorted": true,
        "unsorted": false,
        "empty": false
      },
      "offset": 0,
      "paged": true,
      "unpaged": false
    },
    "totalPages": "<Integer>",
    "totalElements": "<Long>",
    "last": "<Boolean>",
    "size": 5,
    "number": 0,
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "numberOfElements": "<Integer>",
    "first": "<Boolean>",
    "empty": "<Boolean>"
  }
}
```

---
### 4. Get User Order History
Endpoint: GET `/api/v1/order/history`

This endpoint retrieves a paginated list of the authenticated user's order history.

**URL:** `/api/v1/order/history`  
**Method:** `GET`  
**Authentication:** Bearer Token required

**Headers:**
- `Authorization: Bearer <token>`


**Example Request:**
```http
GET http://127.0.0.1/api/v1/order/history?page=0 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "The following user orders were found",
  "data": {
    "content": [
      {
        "id": "<UUID>",
        "address": "<Address string>",
        "paymentMethod": "<Payment method>",
        "creationDate": "<ISO 8601 date>",
        "shippingPrice": "<Decimal>",
        "totalPrice": "<Decimal>",
        "orderStatus": "<Order status>",
        "inventory": [
          {
            "id": "<Inventory ID>",
            "productName": "<Product name>",
            "color": "<Color name>",
            "size": "<Size>",
            "amount": "<Integer>"
          }
        ]
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 5,
      "sort": {
        "sorted": true,
        "unsorted": false,
        "empty": false
      },
      "offset": 0,
      "paged": true,
      "unpaged": false
    },
    "totalPages": "<Integer>",
    "totalElements": "<Long>",
    "last": "<Boolean>",
    "size": 5,
    "number": 0,
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    },
    "numberOfElements": "<Integer>",
    "first": "<Boolean>",
    "empty": "<Boolean>"
  }
}
```
## Cart Endpoints

Below are the available endpoints in the API for managing shopping carts, along with request examples.
Each endpoint is designed to facilitate different functionalities related to adding, removing, and retrieving cart items.

***Note:*** **User authentication is required for all cart operations.**

### 1. Add Item to Cart
Endpoint: POST `/api/v1/cart/add`

This endpoint handles adding a product to the user's cart.

**URL:** `/api/v1/cart/add`  
**Method:** `POST`

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <token>`

**Body:**
```json
{
  "inventoryId": "<inventory_id>",
  "amount": "<quantity>"
}
```

**Example Request:**
```http
POST http://127.0.0.1/api/v1/cart/add HTTP/1.1
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "inventoryId": 1,
  "amount": 2
}
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "product added to cart",
  "success": true,
  "data": [
    {
      "inventoryId": 1,
      "productName": "Sample Product",
      "amount": 2,
      "price": 19.99
    }
  ]
}
```

---

### 2. Check if Item is in Cart
Endpoint: GET `/api/v1/cart/contains/{inventoryId}`

This endpoint checks if a specific item is in the user's cart.

**URL:** `/api/v1/cart/contains/{inventoryId}`  
**Method:** `GET`

**Headers:**
- `Authorization: Bearer <token>`

**Example Request:**
```http
GET http://127.0.0.1/api/v1/cart/contains/1 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "Items in cart",
  "success": true,
  "data": true
}
```

---

### 3. Remove Item from Cart
Endpoint: DELETE `/api/v1/cart/remove/{inventoryId}`

This endpoint removes an item from the user's cart or reduces its quantity.

**URL:** `/api/v1/cart/remove/{inventoryId}`  
**Method:** `DELETE`

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <token>`

**Example Request:**
```http
DELETE http://127.0.0.1/api/v1/cart/remove/1?amount=1 HTTP/1.1
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "Product amount updated",
  "success": true,
  "data": [
    {
      "inventoryId": 1,
      "productName": "Sample Product",
      "amount": 1,
      "price": 19.99
    }
  ]
}
```

---

### 4. Get User's Cart
Endpoint: GET `/api/v1/cart/get`

This endpoint retrieves the current user's cart contents.

**URL:** `/api/v1/cart/get`  
**Method:** `GET`

**Headers:**
- `Authorization: Bearer <token>`

**Example Request:**
```http
GET http://127.0.0.1/api/v1/cart/get HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "Cart items",
  "success": true,
  "data": [
    {
      "inventoryId": 1,
      "productName": "Sample Product 1",
      "amount": 2,
      "price": 19.99
    },
    {
      "inventoryId": 3,
      "productName": "Sample Product 2",
      "amount": 1,
      "price": 29.99
    }
  ]
}
```


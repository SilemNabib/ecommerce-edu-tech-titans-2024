## Inventory Admin Endpoints

These endpoints are for administrative operations related to product inventory and colors. They require administrator authentication.

### 1. Add Inventories
Endpoint: POST `/api/v1/admin/product/inventory/`

This endpoint handles the creation of multiple inventory items.

**URL:** `/api/v1/admin/product/inventory/`  
**Method:** `POST`  
**Authentication:** Administrator access required

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <admin_token>`

**Body:**
```json
[
  {
    "productId": "<product_id>",
    "colorName": "<color_name>",
    "size": "<size>",
    "stock": "<stock_quantity>"
  },
  {
    "productId": "<another_product_id>",
    "colorName": "<another_color_name>",
    "size": "<another_size>",
    "stock": "<another_stock_quantity>"
  }
]
```

**Example Request:**
```http
POST http://127.0.0.1/api/v1/admin/product/inventory/ HTTP/1.1
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

[
  {
    "productId": "1",
    "colorName": "Red",
    "size": "M",
    "stock": 100
  },
  {
    "productId": "2",
    "colorName": "Blue",
    "size": "L",
    "stock": 50
  }
]
```

**Response:**
```json
{
  "statusCode": 201,
  "message": "Inventories added successfully",
  "success": true,
  "data": [
    {
      "id": 1,
      "product": {"id": 1, "name": "Product 1"},
      "color": {"name": "Red", "code": "#FF0000"},
      "size": "M",
      "stock": 100
    },
    {
      "id": 2,
      "product": {"id": 2, "name": "Product 2"},
      "color": {"name": "Blue", "code": "#0000FF"},
      "size": "L",
      "stock": 50
    }
  ]
}
```

---

### 2. Add Colors
Endpoint: POST `/api/v1/admin/product/inventory/color`

This endpoint handles the creation of multiple color options.

**URL:** `/api/v1/admin/product/inventory/color`  
**Method:** `POST`  
**Authentication:** Administrator access required

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <admin_token>`

**Body:**
```json
[
  {
    "name": "<color_name>",
    "code": "<color_code>"
  },
  {
    "name": "<another_color_name>",
    "code": "<another_color_code>"
  }
]
```

**Example Request:**
```http
POST http://127.0.0.1/api/v1/admin/product/inventory/color HTTP/1.1
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

[
  {
    "name": "Forest Green",
    "code": "#228B22"
  },
  {
    "name": "Royal Purple",
    "code": "#7851A9"
  }
]
```

**Response:**
```json
{
  "statusCode": 201,
  "message": "Colors added successfully",
  "success": true,
  "data": [
    {
      "name": "Forest Green",
      "code": "#228B22"
    },
    {
      "name": "Royal Purple",
      "code": "#7851A9"
    }
  ]
}
```

---

## Inventory Public Endpoints
This endpoint is for public access to retrieve unique colors and sizes available in the inventory.

### 1. Get Unique Colors and Sizes
Endpoint: GET `/api/v1/product/inventory/unique
`

This endpoint retrieves the list of unique colors and sizes available across all products.

**URL:** `/api/v1/product/inventory/unique`  
**Method:** `GET`  
**Authentication:** Not required


**Example Request:**
```http
GET http://127.0.0.1/api/v1/product/inventory/unique HTTP/1.1
```

**Response:**
```json
{
  "sizes": ["S", "M", "L", "XL"],
  "colors": [
    {"name": "Red", "code": "#FF0000"},
    {"name": "Blue", "code": "#0000FF"},
    {"name": "Forest Green", "code": "#228B22"},
    {"name": "Royal Purple", "code": "#7851A9"}
  ]
}
```

---

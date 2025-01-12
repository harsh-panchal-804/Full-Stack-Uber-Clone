# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint allows a new user to register by providing their first name, last name, email, and password. The password will be hashed before storing in the database.

## Request Body
The request body should be a JSON object with the following properties:
- `fullname`: An object containing:
  - `firstname`: A string representing the user's first name (minimum 3 characters).
  - `lastname`: A string representing the user's last name (minimum 3 characters).
- `email`: A string representing the user's email (must be a valid email format).
- `password`: A string representing the user's password (minimum 5 characters).

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `201 Created`
- **Body**: A JSON object containing the authentication token and user details.
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

### Validation Errors
- **Status Code**: `400 Bad Request`
- **Body**: A JSON object containing an array of validation error messages.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Password must be at least 5 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

### Missing Fields
- **Status Code**: `400 Bad Request`
- **Body**: A JSON object containing an error message.
  ```json
  {
    "message": "All fields are required"
  }
  ```

## Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.
- The password is hashed before being stored in the database for security purposes.

# User Login Endpoint

## Endpoint
`POST /users/login`

## Description
This endpoint allows an existing user to log in by providing their email and password.

## Request Body
The request body should be a JSON object with the following properties:
- `email`: A string representing the user's email (must be a valid email format).
- `password`: A string representing the user's password (minimum 5 characters).

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Body**: A JSON object containing the authentication token and user details.
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

### Validation Errors
- **Status Code**: `400 Bad Request`
- **Body**: A JSON object containing an array of validation error messages.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 5 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

### Invalid Credentials
- **Status Code**: `401 Unauthorized`
- **Body**: A JSON object containing an error message.
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

## Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.

# User Profile Endpoint

## Endpoint
`GET /users/profile`

## Description
This endpoint allows an authenticated user to retrieve their profile information.

## Request Headers
- `Authorization`: A string containing the Bearer token.

Example:
```
Authorization: Bearer jwt_token_here
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Body**: A JSON object containing the user details.
  ```json
  {
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

### Unauthorized
- **Status Code**: `401 Unauthorized`
- **Body**: A JSON object containing an error message.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

## Notes
- Ensure that the `Authorization` header is set to `Bearer jwt_token_here` when making the request.

# User Logout Endpoint

## Endpoint
`GET /users/logout`

## Description
This endpoint allows an authenticated user to log out by invalidating their token.

## Request Headers
- `Authorization`: A string containing the Bearer token.

Example:
```
Authorization: Bearer jwt_token_here
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Body**: A JSON object containing a success message.
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Unauthorized
- **Status Code**: `401 Unauthorized`
- **Body**: A JSON object containing an error message.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

## Notes
- Ensure that the `Authorization` header is set to `Bearer jwt_token_here` when making the request.

# Captain Registration Endpoint

## Endpoint
`POST /captain/register`

## Description
This endpoint allows a new captain to register by providing their first name, last name, email, password, and vehicle details. The password will be hashed before storing in the database.

## Request Body
The request body should be a JSON object with the following properties:
- `fullname`: An object containing:
  - `firstname`: A string representing the captain's first name (minimum 3 characters).
  - `lastname`: A string representing the captain's last name (minimum 3 characters).
- `email`: A string representing the captain's email (must be a valid email format).
- `password`: A string representing the captain's password (minimum 5 characters).
- `vehicle`: An object containing:
  - `color`: A string representing the vehicle's color (minimum 3 characters).
  - `plate`: A string representing the vehicle's plate number (minimum 3 characters).
  - `capacity`: A number representing the vehicle's capacity (minimum 1).
  - `vehicleType`: A string representing the vehicle's type (must be one of "car", "motorcycle", "auto").

Example:
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Responses

### Success
- **Status Code**: `201 Created`
- **Body**: A JSON object containing the authentication token and captain details.
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "socketId": null,
      "status": "inactive"
    }
  }
  ```

### Validation Errors
- **Status Code**: `400 Bad Request`
- **Body**: A JSON object containing an array of validation error messages.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Password must be at least 5 characters long",
        "param": "password",
        "location": "body"
      },
      {
        "msg": "Color must be at least 3 characters long",
        "param": "vehicle.color",
        "location": "body"
      },
      {
        "msg": "Plate must be at least 3 characters long",
        "param": "vehicle.plate",
        "location": "body"
      },
      {
        "msg": "Capacity must be a number",
        "param": "vehicle.capacity",
        "location": "body"
      },
      {
        "msg": "Vehicle type must be one of 'car', 'motorcycle', 'auto'",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```

### Missing Fields
- **Status Code**: `400 Bad Request`
- **Body**: A JSON object containing an error message.
  ```json
  {
    "message": "All fields are required"
  }
  ```

## Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.
- The password is hashed before being stored in the database for security purposes.

# Captain Login Endpoint

## Endpoint
`POST /captain/login`

## Description
This endpoint allows an existing captain to log in by providing their email and password.

## Request Body
The request body should be a JSON object with the following properties:
- `email`: A string representing the captain's email (must be a valid email format).
- `password`: A string representing the captain's password (minimum 5 characters).

Example:
```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Body**: A JSON object containing the authentication token and captain details.
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "socketId": null,
      "status": "inactive"
    }
  }
  ```

### Validation Errors
- **Status Code**: `400 Bad Request`
- **Body**: A JSON object containing an array of validation error messages.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 5 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

### Invalid Credentials
- **Status Code**: `400 Bad Request`
- **Body**: A JSON object containing an error message.
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

## Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.

# Captain Profile Endpoint

## Endpoint
`GET /captain/profile`

## Description
This endpoint allows an authenticated captain to retrieve their profile information.

## Request Headers
- `Authorization`: A string containing the Bearer token.

Example:
```
Authorization: Bearer jwt_token_here
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Body**: A JSON object containing the captain details.
  ```json
  {
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "socketId": null,
      "status": "inactive"
    }
  }
  ```

### Unauthorized
- **Status Code**: `401 Unauthorized`
- **Body**: A JSON object containing an error message.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

## Notes
- Ensure that the `Authorization` header is set to `Bearer jwt_token_here` when making the request.

# Captain Logout Endpoint

## Endpoint
`GET /captain/logout`

## Description
This endpoint allows an authenticated captain to log out by invalidating their token.

## Request Headers
- `Authorization`: A string containing the Bearer token.

Example:
```
Authorization: Bearer jwt_token_here
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Body**: A JSON object containing a success message.
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Unauthorized
- **Status Code**: `401 Unauthorized`
- **Body**: A JSON object containing an error message.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

## Notes
- Ensure that the `Authorization` header is set to `Bearer jwt_token_here` when making the request.
# Get Fare Endpoint

## Endpoint
`GET /ride/fare`

## Description
This endpoint allows users to get the fare estimate for a ride based on the pickup and destination locations.

## Request Parameters
The request should include the following query parameters:
- `pickup`: A string representing the pickup location.
- `destination`: A string representing the destination location.

Example:
GET /ride/fare?pickup=location1&destination=location2

## Responses

### Success
- **Status Code**: `200 OK`
- **Body**: A JSON object containing the fare estimate for different vehicle types.
  ```json
  {
    "auto": 50.0,
    "car": 100.0,
    "motorcycle": 30.0
  }
    {
    "errors": [
      {
        "msg": "Invalid pickup location",
        "param": "pickup",
        "location": "query"
      },
      {
        "msg": "Invalid destination location",
        "param": "destination",
        "location": "query"
      }
    ]
  }
{
  "message": "Missing pickup or destination"
}
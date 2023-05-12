# express

expressJS-sequelize-jwt-mysql

nodemon server.js

```
  [POST] /api/auth/signup
  {
    "username":"fazriachyar",
    "email": "fazriachyar@yandex.com",
    "password": "123",
    "roles": ["moderator", "user"]
  }

  response:
  {
    "message": "User was registered successfully"
  }

  ==============================
  [POST] /api/auth/signin
  {
    "username":"fazriachyar",
    "password": "123"
  }

  response:
  {
    "id": 1,
    "username": "fazriachyar",
    "email": "fazriachyar@yandex.com",
    "roles": [
      "ROLE_USER",
      "ROLE_MODERATOR"
    ],
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgzNzEzNTk5LCJleHAiOjE2ODM3OTk5OTl9.-ieziaaOr9yf3KYBsaSEFO3-UQZZJXYCGxNS8erk1QQ"
  }
  ==============================
  [POST] /api/tasks/
  {
    "title": "How To Make Computer",
    "description":"The main parts that you'll need are: Motherboard. Processor (CPU) Storage (hard drive or SSD) Memory (RAM) Case. Fans. Power supply."
  }

  response:
  {
    "id": 1,
    "title": "How To Make Computer",
    "description": "The main parts that you'll need are: Motherboard. Processor (CPU) Storage (hard drive or SSD) Memory (RAM) Case. Fans. Power supply.",
    "published": false,
    "updatedAt": "2023-05-10T10:44:11.366Z",
    "createdAt": "2023-05-10T10:44:11.366Z"
  }
  ==============================
  [POST] /api/tasks/create-comment
  {
    "tutorialId":1,
    "text": "ini adalah contoh komentar untuk tutorial"
  }

  response
  {
    "message": "Insert Comment Success by fazriachyar"
  }
```

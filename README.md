# Bytebank

Bytebank is a digital banking MVP that is at the beginning of its activities but still has a long way to go.

# JSONServer + JWT Auth

This is a mocked Rest API, using json-server and JWT.

## 🛠️ Installation

```bash
$ npm install
$ npm run start-api
```

## 🛠️ How to register?

You can do this by making a post request to:

```
POST http://localhost:8000/public/cadastrar
```

With the following data:

```
{
    "name": "Kayo Ennrique",
    "email": "kayo.ennrique@hotmail.com.br",
    "password": "123456",
}
```

Note that email is a unique field and users with duplicate emails will not be persisted.

## 🛠️ How to log in?

You can do this by making a post request to:

```
POST http://localhost:8000/public/login
```

With the following data:

```
{
  "email": "kayo.ennrique@hotmail.com.br",
  "password":"123456"
}
```

You will receive a token in the following format:

```
{
   "access_token": "<ACCESS_TOKEN>",
   "user": { ... user data ... }
}
```

## Authenticate upcoming requests?

And then, add this same token to the header of the next requests:

```
Authorization: Bearer <ACCESS_TOKEN>
```

## 📚 More course information

Bytebank is a project used throughout the React training: Testing your Front-end, and this API will be used in some courses :)
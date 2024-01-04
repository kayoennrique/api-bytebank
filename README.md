## 🛠️ Installation

```bash
$ npm install
$ npm run dev
```

## 🛠️ How to register?

You can register by making a post request to:

```
POST http://localhost:8000/users/register
```

With the following data for example:

```
{
    "name": "Kayo Ennrique",
    "email": "kayo.ennrique@hotmail.com.br",
    "password": "123456",
}
```

Email is a unique field and users with duplicate emails will not be persisted.

## 🛠️ How to log in?

You can log in by making a post request to:

```
POST http://localhost:8000/users/login
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

Bytebank is a project used throughout React training: Improve your applications with automated tests, and this API will be used in some courses :)
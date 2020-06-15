# In-memory webshop API

A simple webshop server with in-memory dummy database instead of an actual database. For use in the Frontend Architecture lessons, to learn about:

- React context / global state
- Handling authentication in the frontend

## How to run it

- Install the dependencies with `npm install`
- Run the server with `npm start`
- Visit it at http://localhost:4000, or use [HTTPie](https://httpie.org/) to test it out from your terminal, like the examples below

## Features included

**Login**

```
http -v POST http://localhost:4000/login email=danny@codaisseur.com password=supersecret
```

If you send along the right email and password, this will result in a response like so:

```
{
  "token": "eyJhbGciOiJIUzI1N..."
}
```

**Get all products**

http://localhost:4000/products

```
http -v GET http://localhost:4000/products
```

**Get a single product**

http://localhost:4000/products/2

```
http -v GET http://localhost:4000/products/2
```

**Get all users**

http://localhost:4000/users

```
http -v GET http://localhost:4000/users
```

**Get a single user**

http://localhost:4000/users/2

```
http -v GET http://localhost:4000/users/2
```

**Get your shopping cart's contents**

```
http -v GET http://localhost:4000/cart Authorization:"Bearer eyJhbGciOiJIUzI1N..."
```

(Put in the whole JWT token though, that you got from first logging in.)

**Putting an item in your cart, of changing the quantity**

```
http -v POST http://localhost:4000/cart productId:=2 quantity:=5 Authorization:"Bearer eyJhbGciOiJIUzI1N..."
```

(Put in the whole JWT token though, that you got from first logging in.)

**Removing an item from your cart entirely**

```
http -v DELETE http://localhost:4000/cart productId:=3 Authorization:"Bearer eyJhbGciOiJIUzI1N..."
```

(Put in the whole JWT token though, that you got from first logging in.)

## Features not included

- Actual persistence of the data. Every time the server restarts, the dummy data is back to where it was. We'll learn about _databases_ next week.

- Actually buying and shipping the products :) What would it even mean, right?

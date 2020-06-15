const md5 = require("md5");
const { createJWT, authMiddleware } = require("./auth.js");

// load our "dummy database" data
const database = require("./dummy_database.js");

// import express, the server library
const express = require("express");

// create the server
const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.send({
    message:
      "Hello! You probably want to head over to /products or /users or /cart. Also, read the README for more info!",
  });
});

app.get("/products", (request, response) => {
  response.json(database.products);
});

app.get("/products/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const product = database.products.find((product) => {
    return product.id === id;
  });
  if (product) {
    response.json(product);
  } else {
    response
      .status(400)
      .json({ error: "Product with this ID does not exist!" });
  }
});

app.get("/users", (request, response) => {
  response.json(
    database.users.map((user) => {
      // Let's not return the password :D
      const { passwordHash, ...rest } = user;
      return rest;
    })
  );
});

app.get("/users/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const user = database.users.find((user) => {
    return user.id === id;
  });
  if (user) {
    const { passwordHash, ...rest } = user;
    response.json(rest);
  } else {
    response.status(400).json({ error: "User with this ID does not exist!" });
  }
});

app.post("/login", (request, response) => {
  const { email, password } = request.body;
  const user = database.users.find((user) => {
    return user.email === email;
  });
  if (!user) {
    return response.status(400).json({
      error: "User with this email does not exist!",
    });
  } else if (user.passwordHash !== md5(password)) {
    return response.status(400).json({
      error: "Incorrect password!",
    });
  } else {
    response.json({
      token: createJWT({ userId: user.id }),
    });
  }
});

app.get("/cart", authMiddleware, (request, response) => {
  // We know who this is, because we're using the auth middleware,
  //  which only allows a request to pass to this handler
  //  if a token was sent along. From this token, we know
  //  who it is who's sending the request.
  const { user } = request;

  response.json({
    cart: database.cartItems
      .filter((item) => {
        return item.userId === user.id;
      })
      .map((item) => {
        return {
          ...item,
          product: database.products.find((p) => p.id === item.productId),
        };
      }),
  });
});

app.post("/cart", authMiddleware, (request, response) => {
  const { user } = request;

  const { productId, quantity = 1 } = request.body;
  const product = database.products.find((p) => p.id === productId);

  if (product && typeof quantity === "number" && quantity >= 1) {
    let cartItem = database.cartItems.find((item) => {
      return item.userId === user.id && item.productId === productId;
    });
    if (cartItem) {
      cartItem.quantity = quantity;
    } else {
      cartItem = {
        userId: user.id,
        productId,
        quantity,
      };
      database.cartItems.push(cartItem);
    }

    return response.json({ ...cartItem, product });
  } else {
    return response.status(400).json({
      error:
        "Product does not exist, or invalid quantity. Are both values numbers?",
    });
  }
});

app.delete("/cart", authMiddleware, (request, response) => {
  const { user } = request;

  const { productId } = request.body;
  const product = database.products.find((p) => p.id === productId);

  if (product) {
    database.cartItems = database.cartItems.filter((item) => {
      return !(item.productId === productId && item.userId === user.id);
    });
    return response.json({ removed: true });
  } else {
    return response.status(400).json({
      error: "Product does not exist. Is the ID a number?",
    });
  }
});

// "start" the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 Started server at http://localhost:${port}`);
});

// Importing required route files
const indexR = require("./index");
const usersR = require("./users");
const productsR = require("./products");
const categoriesR = require("./categories");

// Function to initialize routes
exports.routesInit = (app) => {
  // Mounting indexR route handler for the root URL ("/")
  app.use("/", indexR);

  // Mounting usersR route handler for "/users" URL
  app.use("/users", usersR);

  // Mounting productsR route handler for "/products" URL
  app.use("/products", productsR);

  // Mounting categoriesR route handler for "/categories" URL
  app.use("/categories", categoriesR);
};

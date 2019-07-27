//This notes that the app requires mySQL and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// This Sets Up the connection to myStoreDB on port 3306
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "myStoreDB"
  });
  
  // Connects to DB
  connection.connect(function (err) {
    if (err) throw err;
  });

// Starts App and Requests ID of Item Buying/Amount. 
  function start() {
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "What is the Product ID of the item you would like to purchase?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
  
        {
          name: "quantity",
          type: "input",
          message: "How many of the listed product would you like to buy?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])

      //This Notes the ID chosen and the Qualtity Chosen and Displays to User
      .then(function (input) {
  
        var item = input.id;
        var quantity = input.quantity;
  
        console.log('You Have Chosen: \n    id = '  + input.id + '\n    Quantity = ' + input.quantity);
  
  
        // Checks if there is enough product in the System
        var queryStr = 'SELECT * FROM products WHERE ?';
  
        connection.query(queryStr, { id: item }, function (err, data) {
          if (err) throw err;
  
          // If a Invalid ID is selected, an error message occurs and the connection is ended. 
  
          if (data.length === 0) {
            console.log('ERROR: Please select a valid Item ID.');
            displayInventory();
                connection.end();
          } else {
            var productData = data[0];
  
  
            // Message Displayed with a Valid Order
            if (quantity <= productData.stock_quantity) {
              console.log('The product you requested is in stock! Placing order!');

              var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE id = ' + item;
  
              // Update Inventory then End Connection. Else Log that there is not enough product and modify connection 
              connection.query(updateQueryStr, function (err, data) {
                if (err) throw err;
  
                console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                console.log('Thank you for shopping with StoreApp!');
                console.log("\n---------------------------------------------------------------------\n");
                connection.end();
              })
            } else {
              console.log('Sorry, there is not enough product in stock, your order cannot be placed');
              console.log('Please modify your order amount to a smaller number.');
              console.log("\n---------------------------------------------------------------------\n");
  
              connection.end();
            }
          }
        })
      })
  }
  
  // This Displays Inventory
  function displayInventory() {
  
    // Construct the DB Query String
    queryStr = 'SELECT * FROM products';
  
    // Query the DB and then log the current stock of all goods
    connection.query(queryStr, function (err, data) {
      if (err) throw err;
  
      console.log('Current Stock: ');
  
      var stock = '';
      for (var i = 0; i < data.length; i++) {
        stock = '';
        stock += 'ID: ' + data[i].id + '  ||  ';
        stock += 'Product Name: ' + data[i].product_name + '  ||  ';
        stock += 'Department: ' + data[i].department_name + '  ||  ';
        stock += 'Price: $' + data[i].price + ' || ';
        stock += 'Stock Quantity: ' + data[i].stock_quantity + '\n';
  
        console.log(stock);
      }
  
      start();
    })
  }
  
  function myStore() {
    displayInventory();
  }
  myStore();
Drop database if exists mystoreDB;
Create database mystoreDB;
use mystoreDB;

Create Table products (
 id integer not null auto_increment,
 product_name varchar(100) null,
 department_name varchar(100) null,
 price int null,
 stock_quantity int null,
Primary Key (id)
);

Insert into products (product_name, department_name, price, stock_quantity)
values ("Panasonic TV", "Electronics", 500, 100),
		("Playstation 4", "Electronics", 300, 50),
        ("Xbox One", "Electronics", 250, 50),
        ("Levis Jeans", "Clothing", 40, 40),
        ("Nike Sneakers", "Shoes", 100, 100),
		("Crock Pot", "Cooking", 175, 20),
        ("White Tshirt", "Clothing", 20, 25),
        ("Brown Leather Couch", "Homewares", 700, 2),
		("Orange Gatorade", "Beverages", 5, 200),
        ("Italian Sausage", "Food", 8, 10);
        
Select * from products;
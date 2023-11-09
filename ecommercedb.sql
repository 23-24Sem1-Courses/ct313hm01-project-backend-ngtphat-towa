-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2023 at 10:47 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommercedb`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`` PROCEDURE `AddToCart` (IN `p_cartId` INT, IN `p_userId` INT, IN `p_productId` INT, IN `p_quantity` INT)   BEGIN
    DECLARE v_price DECIMAL(10,2);
    DECLARE v_totalCost DECIMAL(10,2);

    -- Retrieve the price of the product from the Product table
    SELECT price INTO v_price FROM products WHERE id = p_productId;

    -- Calculate the total cost of the added item
    SET v_totalCost = p_quantity * v_price;

    -- Insert a new row into the CartItem table
    INSERT INTO cart_items(cartId, productId, quantity, price, createdDate)
    VALUES (p_cartId, p_productId, p_quantity, v_price, NOW());

    -- Call the UpdateTotalCost stored procedure to update the TotalCost in the Cart table
    CALL UpdateTotalCost(p_cartId, p_userId, v_totalCost);
END$$

CREATE DEFINER=`` PROCEDURE `CreateCart` (IN `p_userId` INT)   BEGIN
    DECLARE v_cartId INT;

    -- Insert a new row into the Cart table
    INSERT INTO carts (userId)
    VALUES (p_userId);

    -- Get the ID of the newly inserted row
    SET v_cartId = LAST_INSERT_ID();

    -- Return the newly created row
    SELECT * FROM carts WHERE id = v_cartId;
END$$

CREATE DEFINER=`` PROCEDURE `GetCart` (IN `p_userId` INT)   BEGIN
     SELECT * FROM carts WHERE userId= p_userId ORDER BY id DESC LIMIT 1;
END$$

CREATE DEFINER=`` PROCEDURE `GetCartItems` (IN `p_cartId` INT)   BEGIN
    SELECT 
        ci.id, 
        ci.cartId, 
        ci.quantity, 
        ci.productId, 
        ci.price, 
        p.description,
        p.imageURL,
        p.name,
        ci.createdDate
    FROM 
        cart_items ci
    INNER JOIN 
        products p ON ci.productId = p.id
    WHERE 
        ci.cartId = p_cartId;
END$$

CREATE DEFINER=`` PROCEDURE `RemoveCartItem` (IN `p_userId` INT, IN `p_cartId` INT, IN `p_productId` INT)   BEGIN
    DECLARE v_quantity INT;
    DECLARE v_price DECIMAL(10,2);
    DECLARE v_totalCostDifference DECIMAL(10,2);

    -- Retrieve the quantity and price of the cart item from the CartItem table
    SELECT quantity, price INTO v_quantity, v_price FROM cart_items WHERE cartId = p_cartId AND productId = p_productId;

    -- Calculate the total cost of the removed item
    SET v_totalCostDifference = v_quantity * v_price;

    -- Remove the item from the CartItem table
    DELETE FROM cart_items WHERE cartId = p_cartId AND productId = p_productId;

    -- Call the UpdateTotalCost stored procedure to update the TotalCost in the Cart table
    CALL UpdateTotalCost(p_cartId, p_userId, -v_totalCostDifference);
END$$

CREATE DEFINER=`` PROCEDURE `UpdateCartItemQuantity` (IN `p_userId` INT, IN `p_cartId` INT, IN `p_productId` INT, IN `p_newQuantity` INT)   BEGIN
    DECLARE v_oldQuantity INT;
    DECLARE v_price DECIMAL(10,2);
    DECLARE v_totalCostDifference DECIMAL(10,2);

    -- Retrieve the old quantity and price of the cart item from the CartItem table
    SELECT Quantity, Price INTO v_oldQuantity, v_price FROM cart_items WHERE cartId = p_cartId AND productId = p_productId;

    -- Calculate the difference in total cost
    SET v_totalCostDifference = (p_newQuantity - v_oldQuantity) * v_price;

    -- Update the quantity in the CartItem table
    UPDATE cart_items
    SET quantity = p_newQuantity
    WHERE cartId = p_cartId AND productId = p_productId;

    -- Call the UpdateTotalCost stored procedure to update the TotalCost in the Cart table
    CALL UpdateTotalCost(p_cartId, p_userId,  v_totalCostDifference);
END$$

CREATE DEFINER=`` PROCEDURE `UpdateTotalCost` (IN `p_cartId` INT, IN `p_userId` INT, IN `p_totalCost` DECIMAL(10,2))   BEGIN
    -- Update the TotalCost in the Cart table
    UPDATE carts
    SET totalCost = TotalCost + p_totalCost
    WHERE id = p_cartId AND userId =p_userId;

    -- Return the updated Cart
    SELECT * FROM carts WHERE Id = p_cartId;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `totalCost` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `productId` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `imageUrl`) VALUES
(1, 'Electronics', 'A wide variety of electronic devices, including computers, smartphones, TVs, and more.', 'https://example.com/images/categories/electronics.jpg'),
(2, 'Clothing', 'A wide variety of clothing for men, women, and children.', 'https://example.com/images/categories/clothing.jpg'),
(3, 'Home & Garden', 'A wide variety of products for your home and garden, including furniture, appliances, and tools.', 'https://example.com/images/categories/home-and-garden.jpg'),
(4, 'Food & Drink', 'A wide variety of food and drinks, including groceries, snacks, and beverages.', 'https://example.com/images/categories/food-and-drink.jpg'),
(5, 'Health & Beauty', 'A wide variety of health and beauty products, including cosmetics, skincare products, and vitamins.', 'https://example.com/images/categories/health-and-beauty.jpg'),
(6, 'Toys & Games', 'A wide variety of toys and games for children of all ages.', 'https://example.com/images/categories/toys-and-games.jpg'),
(7, 'Sports & Outdoors', 'A wide variety of sports and outdoor equipment, including clothing, footwear, and gear.', 'https://example.com/images/categories/sports-and-outdoors.jpg'),
(8, 'Books & Music', 'A wide variety of books and music, including fiction, nonfiction, and albums.', 'https://example.com/images/categories/books-and-music.jpg'),
(9, 'Pet Supplies', 'A wide variety of supplies for your pet, including food, toys, and accessories.', 'https://example.com/images/categories/pet-supplies.jpg'),
(30, 'Test update category', 'This is a new category', 'http://example.com/image.jpg'),
(31, 'name', 'This is a new category', 'http://example.com/image.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `createdDate` datetime NOT NULL,
  `totalPrice` double NOT NULL,
  `sessionId` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` double NOT NULL,
  `createdDate` datetime NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `productId` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `categoryId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `description`, `imageUrl`, `name`, `price`, `categoryId`) VALUES
(18, 'A powerful laptop with a long-lasting battery and a high-resolution display.', 'https://example.com/images/products/laptop.jpg', 'MacBook Pro', 1999.99, 1),
(19, 'A smartphone with a triple-lens camera and a long-lasting battery.', 'https://example.com/images/products/smartphone.jpg', 'Google Pixel 7', 799.99, 1),
(20, 'A smart TV with a 4K display and HDR support.', 'https://example.com/images/products/smart-tv.jpg', 'Samsung QN90A Neo QLED 4K Smart TV', 1299.99, 1),
(21, 'A stylish and comfortable pair of jeans.', 'https://example.com/images/products/jeans.jpg', 'Levi\'s 501 Original Fit Jeans', 99.99, 2),
(22, 'A soft and comfortable cotton t-shirt.', 'https://example.com/images/products/t-shirt.jpg', 'Hanes Men\'s Tagless ComfortSoft Crewneck T-Shirt', 19.99, 2),
(23, 'A durable and stylish pair of hiking boots.', 'https://example.com/images/products/hiking-boots.jpg', 'Merrell Moab 2 Vent Hiking Boots', 149.99, 3),
(24, 'A lightweight and comfortable running shoe.', 'https://example.com/images/products/running-shoe.jpg', 'Nike Air Zoom Pegasus 39', 119.99, 3),
(25, 'A nutritious and delicious protein powder.', 'https://example.com/images/products/protein-powder.jpg', 'Optimum Nutrition Gold Standard 100% Whey Protein Powder', 39.99, 4),
(26, 'A refreshing and healthy energy drink.', 'https://example.com/images/products/energy-drink.jpg', 'Red Bull Energy Drink', 3.99, 4),
(27, 'A fun and educational toy for children of all ages.', 'https://example.com/images/products/toy.jpg', 'LEGO Classic Large Creative Brick Box', 49.99, 5),
(28, 'A classic and fun board game for the whole family.', 'https://example.com/images/products/board-game.jpg', 'Monopoly Classic Board Game', 29.99, 5),
(29, 'A delicious and nutritious dog food.', 'https://example.com/images/products/dog-food.jpg', 'Purina Pro Plan Adult Dog Food', 24.99, 6),
(30, 'A soft and comfortable cat bed.', 'https://example.com/images/products/cat-bed.jpg', 'Armarkat Pet Products Deluxe Plush Donut Cuddler Cat Bed', 19.99, 6),
(39, 'This is updated-updated description', 'https://example.com/images/products/new-product.jpg', 'New Product 3', 32, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(512) DEFAULT NULL,
  `createdDate` datetime DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `expiredTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `token`, `createdDate`, `userId`, `expiredTime`) VALUES
(40, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImZpcnN0TmFtZSI6IlBoYXQiLCJsYXN0TmFtZSI6Ik5ndXllbiIsImVtYWlsIjoidGVzdDIxMjJAZ21haWwuY29tIiwicm9sZSI6MCwiY3JlYXRlZERhdGUiOiIyMDIzLTExLTA0VDA5OjAzOjM1LjAwMFoiLCJpYXQiOjE2OTkyNjA2NzYsImV4cCI6MzM5ODU1NzM1MiwiaXNzIjoiY29vbElzc3VlciJ9.mqwc0qx5HjeDHqcIq-cWSkMsJJSCGcAqqfdpX1FoDIU', '2023-11-04 16:03:35', 32, '2023-11-06 18:51:16'),
(41, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImZpcnN0TmFtZSI6IlBoYXQiLCJsYXN0TmFtZSI6Ik5ndXllbiIsImVtYWlsIjoidGVzdDIxMjJAZ21haWwuY29tIiwicm9sZSI6MCwiY3JlYXRlZERhdGUiOiIyMDIzLTExLTA0VDA5OjAzOjM1LjAwMFoiLCJpYXQiOjE2OTkyNjU0OTAsImV4cCI6MzM5ODU2Njk4MCwiaXNzIjoiY29vbElzc3VlciJ9.nyayZfavcUJJXaXOxqvcprQOuOgvJm7nDIxqjKbjcwU', '2023-11-04 16:03:35', 32, '2023-11-06 20:11:30'),
(42, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImZpcnN0TmFtZSI6IlBoYXQiLCJsYXN0TmFtZSI6Ik5ndXllbiIsImVtYWlsIjoidGVzdDIxMjJAZ21haWwuY29tIiwicm9sZSI6MCwiY3JlYXRlZERhdGUiOiIyMDIzLTExLTA0VDA5OjAzOjM1LjAwMFoiLCJpYXQiOjE2OTkzNDM5ODMsImV4cCI6MzM5ODcyMzk2NiwiaXNzIjoiY29vbElzc3VlciJ9.a0YvlmhKcTcJyNp7KybPDQkzPYihFHSHuKS5QHp6Zro', '2023-11-04 16:03:35', 32, '2023-11-07 17:59:43'),
(43, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImZpcnN0TmFtZSI6IlBoYXQiLCJsYXN0TmFtZSI6Ik5ndXllbiIsImVtYWlsIjoidGVzdDIxMjJAZ21haWwuY29tIiwicm9sZSI6MCwiY3JlYXRlZERhdGUiOiIyMDIzLTExLTA0VDA5OjAzOjM1LjAwMFoiLCJpYXQiOjE2OTk0MTk4NDAsImV4cCI6MzM5ODg3NTY4MCwiaXNzIjoiY29vbElzc3VlciJ9.E0glUUgcwD5s_Jot-bkOtydqYWjNRnxLXy1yHH6BJto', '2023-11-04 16:03:35', 32, '2023-11-08 15:04:00'),
(44, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImZpcnN0TmFtZSI6IlBoYXQiLCJsYXN0TmFtZSI6Ik5ndXllbiIsImVtYWlsIjoidGVzdDIxMjJAZ21haWwuY29tIiwicm9sZSI6MCwiY3JlYXRlZERhdGUiOiIyMDIzLTExLTA0VDA5OjAzOjM1LjAwMFoiLCJpYXQiOjE2OTk0MjMzMDEsImV4cCI6MzM5ODg4MjYwMiwiaXNzIjoiY29vbElzc3VlciJ9.MD7t9zvLfgDMGZj_jglJUlp3kl_FeyuHbKhiMbiOIyY', '2023-11-04 16:03:35', 32, '2023-11-08 16:01:41'),
(45, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImZpcnN0TmFtZSI6IlBoYXQiLCJsYXN0TmFtZSI6Ik5ndXllbiIsImVtYWlsIjoidGVzdDIxMjJAZ21haWwuY29tIiwicm9sZSI6MCwiY3JlYXRlZERhdGUiOiIyMDIzLTExLTA0VDA5OjAzOjM1LjAwMFoiLCJpYXQiOjE2OTk0MjgyODMsImV4cCI6MzM5ODg5MjU2NiwiaXNzIjoiY29vbElzc3VlciJ9.lNZMdhkDLbl6KGD_szvzRGrFBQiKPfBb5ZYsVeGETAM', '2023-11-04 16:03:35', 32, '2023-11-08 17:24:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `firstName`, `lastName`, `password`, `role`, `createdDate`) VALUES
(32, 'test2122@gmail.com', 'Phat', 'Nguyen', '$2a$10$TKKRZinwjnzZPBkKgoHcF.a8OfPpweAuvPRaT08uhu3YTG8giyW0G', '0', '2023-11-04 09:03:35'),
(33, 'test21222@gmail.com', 'Phat', 'Nguyen', '$2a$10$b4O5iOOz0ujSdb.PnifzzuSZYvKde2iTjmEKJ6Vui9GYYDM5rUfZS', '0', '2023-11-04 09:21:38');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `productId` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `userId`, `createdDate`, `productId`) VALUES
(8, 33, '2023-11-06 09:48:34', 18),
(9, 32, '2023-11-06 09:50:03', 18),
(10, 32, '2023-11-06 09:50:03', 20),
(11, 32, '2023-11-06 09:50:03', 19);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_cart` (`userId`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cart_cart_item` (`cartId`),
  ADD KEY `fk_cart_product_item` (`productId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_orders` (`userId`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_items` (`orderId`),
  ADD KEY `fk_order_product` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKog2rp4qthbtt2lfyhfo32lsw9` (`categoryId`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_tokens` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_wishlist` (`userId`,`productId`),
  ADD KEY `fk_wishlist_product_item` (`productId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `fk_user_cart` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_cart_cart_item` FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_cart_product_item` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_user_orders` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_product` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `fk_user_wishlist` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_wishlist_product_item` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

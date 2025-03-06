E-commerce Product Listing

This is a simple e-commerce product listing application built using Next.js, Tailwind CSS, MySQL, and Docker. The application allows users to browse products, add them to the shopping cart, and manage their cart. Additionally, an Admin Dashboard is implemented, where an admin can create, read, and delete product categories, brands, and products.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup Instruction](#setup-instruction)
- [How to Use](#how-to-use)

## Tech Stack

Frontend: Next.js, React, Tailwind CSS
Backend: MySQL (Database for storing product, cart, category, and brand data)
Admin Dashboard: Interface for managing products, categories, and brands (Create, Read, Delete operations)
Containerization: Docker for containerizing the application
State Management: Zustand

## Features

For Users:
Product Listing: View a list of available products including details like name, price, and image.
Product Details: View detailed information about a product on a separate page.
Search and Filter: Search for products and filter by categories or brands.
Shopping Cart: Add products to the cart, view the cart, and remove items or adjust quantities.
Checkout: View the checkout page with order summary and proceed to purchase.

For Admin:
Admin Dashboard: Manage product categories, brands, and products.
Create: Add new products, brands, and categories.
Read: View existing products, brands, and categories.
Delete: Remove products, brands, and categories.

## Setup Instructions

1. Clone the Repository
   Clone this repository to your local machine:
   git clone (https://github.com/SsagarikaR/e-commerce-nextjs)

2. Install Dependencies
   Navigate to the project directory and install the necessary dependencies:
   npm install

3. Set up MySQL Database
   Ensure that you have MySQL installed and running. Create a new database for the application:

4. Docker Setup
   To run the application with Docker, use the provided Docker configuration.

First, build the Docker images:

docker-compose build
Then, run the application:

docker-compose up
The application will be available at http://localhost:3000.

5. Configuration
   Ensure you configure the environment variables in the .env file:

env
Copy
DB_HOST
JWT_SECRET_KEY
DB_USER
DB_PORT
PASSWORD
DB_NAME
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

## How to Use

For Users:
Browse Products: Visit the homepage to view a list of available products.
Search and Filter Products: Use the search bar and filters to find products by category or brand.
Add to Cart: Click on a product to view its details and add it to your shopping cart.
View Cart: Click on the cart icon to view the contents of your shopping cart.
Checkout: Proceed to the checkout page to finalize your purchase.

For Admin:
Login to Admin Dashboard: Use the admin login to access the admin dashboard.
Manage Products, Categories, and Brands:
Create: Add new products, categories, or brands.
Read: View the list of existing products, categories, and brands.
Delete: Remove products, categories, or brands from the list.
Admin Dashboard
The admin dashboard allows admins to create, read, and delete products, categories, and brands.

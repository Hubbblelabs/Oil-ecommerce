# Oil eCommerce Platform

A modern, full-featured e-commerce platform for selling premium oils. Built with Next.js, React, TypeScript, and PostgreSQL.

## Overview

Oil eCommerce is a multi-role e-commerce application that enables customers to browse and purchase oils, sellers to manage their products and sales, and administrators to oversee the entire platform.

## Features

### 🛍️ **Shopping & Product Management**
- **Product Catalog**: Browse oils across multiple categories (Cooking, Premium, Organic, Industrial)
- **Product Search**: Search and filter products by name and category
- **Product Details**: View detailed product information including images, prices, and stock availability
- **Pagination**: Navigate through products with efficient pagination controls
- **Product Grid**: Responsive product grid layout with skeleton loading states
- **Stock Management**: Real-time stock availability tracking and updates

### 🛒 **Shopping Cart**
- **Add to Cart**: Easily add products to shopping cart
- **Cart Management**: View, modify, and remove items from cart
- **Quantity Control**: Adjust product quantities in cart
- **Cart Persistence**: Shopping cart data persists across sessions using localStorage
- **Cart Summary**: Real-time calculation of total items and cart value
- **Price Precision**: Accurate decimal price handling for financial calculations

### 📦 **Order Management**
- **Checkout Process**: Streamlined checkout with shipping and contact information
- **Order Creation**: Create orders with multiple items in a single transaction
- **Stock Validation**: Automatic stock validation and decrement with race condition prevention
- **Order Tracking**: Track order status (Pending, Paid, Shipped, Delivered, Cancelled)
- **Order History**: View complete order history with details and status
- **Order Status Badges**: Visual indicators for order status

### 👥 **User Management & Authentication**
- **User Registration**: Create new user accounts with email and password
- **User Login**: Secure login with JWT-based authentication
- **Session Management**: Persistent sessions using HTTP-only secure cookies
- **Role-Based Access Control**: Three user roles - Admin, Seller, and User
- **User Profiles**: Manage user information and account settings
- **Account Status**: Admin can activate/deactivate user accounts

### 🏪 **Seller Dashboard**
- **Dashboard Overview**: Comprehensive seller dashboard with key metrics
- **Sales Statistics**: View total products, pending orders, and revenue
- **Product Management**: Create, update, and deactivate products
- **Inventory Alerts**: Low stock alerts for inventory management
- **Revenue Analytics**: Track total revenue and earnings
- **Top Products**: View best-selling products with sales metrics
- **Order Tracking**: Monitor pending and completed orders
- **Product Performance**: Analyze product sales and revenue by product

### 👨‍💼 **Admin Dashboard**
- **Platform Statistics**: View total users, sellers, products, and orders
- **Revenue Overview**: Track total platform revenue
- **User Management**: View all users and manage roles
- **User Actions**: Activate/deactivate user accounts and assign roles
- **Order Management**: View all orders and update order statuses
- **Recent Orders**: Monitor recent orders at a glance
- **Admin Analytics**: Comprehensive platform analytics and reporting

### 🎨 **User Interface & Experience**
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Modern Components**: Built with shadcn/ui and Radix UI component libraries
- **Navigation**: Clean and intuitive navigation bar with role-based menus
- **Dark Mode Support**: Theme switching between light and dark modes
- **Animations**: Smooth animations and transitions with Framer Motion
- **Toast Notifications**: User feedback through toast notifications
- **Loading States**: Skeleton screens and loading indicators
- **Charts & Graphs**: Analytics visualization with Recharts

### 🔐 **Security & Reliability**
- **Password Encryption**: Secure password hashing with bcryptjs
- **JWT Authentication**: Token-based authentication with expiration
- **Secure Cookies**: HTTP-only secure cookies for session management
- **Role-Based Authorization**: Endpoint and feature-level access control
- **Transaction Safety**: Atomic database transactions for order creation
- **Stock Locking**: Row-level database locking to prevent race conditions
- **Server-Side Validation**: Price and inventory validation on server
- **Environment Variables**: Secure configuration management

### 📊 **Technical Features**
- **Database**: PostgreSQL with Prisma ORM
- **API Routes**: RESTful API endpoints for all operations
- **Type Safety**: Full TypeScript support for type safety
- **Database Migrations**: Version-controlled database migrations
- **Pagination**: Efficient pagination for large datasets
- **Error Handling**: Comprehensive error handling and custom error types
- **Performance**: Optimized queries with proper indexing

## Getting Started

### Prerequisites
- Node.js 18+ or higher
- pnpm (recommended) or npm
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd oil-ecommerce
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your database connection in `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/oil_ecommerce"
JWT_SECRET="your-secret-key"
```

5. Run database migrations:
```bash
pnpm db:migrate
# or
npm run db:migrate
```

6. (Optional) Seed the database:
```bash
pnpm db:seed
# or
npm run db:seed
```

### Running the Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed database with sample data
- `pnpm db:studio` - Open Prisma Studio

## Project Structure

```
oil-ecommerce/
├── app/                    # Next.js app directory
│   ├── (admin)/           # Admin routes
│   ├── (auth)/            # Authentication routes
│   ├── (seller)/          # Seller routes
│   ├── (shop)/            # Customer shop routes
│   └── api/               # API endpoints
├── components/            # React components
│   ├── shop/              # Shop-specific components
│   └── ui/                # Reusable UI components
├── server/                # Server-side logic
│   ├── services/          # Business logic services
│   ├── repositories/      # Data access layer
│   ├── auth.ts            # Authentication utilities
│   └── validations.ts     # Input validation schemas
├── prisma/                # Database schema and migrations
├── lib/                   # Utility functions
└── public/                # Static assets
```

## Database Schema

The application uses the following main models:

- **User**: Store user accounts with roles (Admin, Seller, User)
- **Product**: Products available for sale with categories and inventory
- **Order**: Customer orders with status tracking
- **OrderItem**: Line items in orders with quantity and pricing

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: JWT, bcryptjs
- **UI Components**: shadcn/ui, Radix UI, Lucide Icons
- **Styling**: Tailwind CSS, Framer Motion
- **Notifications**: Sonner
- **Charts**: Recharts
- **Form Validation**: Zod

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Deploy on Vercel

The easiest way to deploy your app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

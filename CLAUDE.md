# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start Commands

```bash
pnpm dev                    # Start dev server (http://localhost:3000)
pnpm build                  # Build for production
pnpm lint                   # Run ESLint
pnpm db:migrate             # Run pending database migrations
pnpm db:seed                # Seed database with sample data
pnpm db:studio              # Open Prisma Studio (DB UI at http://localhost:5555)
```

## Architecture Overview

This is a full-stack e-commerce platform for **Shri Sameya Village**, a cold-pressed oil seller. The platform allows customers to browse and purchase cold-pressed oils, with admin tools for managing products, inventory, orders, and users. Built with **Next.js 16** (app directory), **React 19**, **PostgreSQL**, and **Prisma ORM**.

### High-Level Structure

- **Next.js App Directory** (`app/`): Organized by route groups
  - `(auth)/`: Login/register flows (public)
  - `(shop)/`: Customer-facing product browsing and purchasing
  - `(admin)/`: Admin dashboard for managing products, orders, users (admin-only)
  - `api/`: RESTful API routes for all operations

- **Server Logic** (`server/`): Organized by layers
  - `services/`: Business logic (ProductService, OrderService, DiscountService, etc.)
  - `repositories/`: Data access layer (ProductRepository, OrderRepository, UserRepository)
  - `auth.ts`: JWT session management and role-based authorization
  - `types.ts`: Shared TypeScript types
  - `validations.ts`: Input validation schemas (Zod)

- **Database** (`prisma/`): PostgreSQL via Prisma ORM
  - `schema.prisma`: Data models (User, Product, Order, OrderItem, Review, Discount)
  - Migrations auto-generated on schema changes

- **Frontend** (`components/`, `app/`): React components with Tailwind CSS, shadcn/ui, Framer Motion

- **Utilities** (`lib/`):
  - `db.ts`: Prisma client singleton
  - `utils.ts`: Common utilities
  - `features.ts`: Feature flag system (controlled via `NEXT_PUBLIC_*` env vars)

## Key Patterns & Principles

### Authentication & Sessions
- JWT tokens stored in HTTP-only secure cookies (24h expiration)
- `getCurrentUser()` retrieves session payload from cookie
- `requireAuth()` and `requireRole()` enforce access control at endpoints
- Two roles: `ADMIN` (manages products, orders, users), `USER` (customers)

### Data Access Layer
All database queries go through repositories to centralize logic and enable easy testing:
- `ProductRepository`: Queries for products, categories, stock
- `OrderRepository`: Order and order-item operations
- `UserRepository`: User lookup and authentication

### Services Layer
Services implement business logic above repositories:
- Validate inputs, enforce permissions, coordinate multi-step operations
- `ProductService`: Product CRUD with admin authorization; soft-delete support
- `OrderService`: **Atomic order creation** with row-level locking (`SELECT FOR UPDATE`) to prevent race conditions on stock
- `AdminService`: Admin dashboard metrics and user management
- `DiscountService`: Discount code validation and tracking
- Custom error types (e.g., `InsufficientStockError`, `ProductAccessError`) for clear error handling

### Transaction Safety
Order creation is wrapped in a database transaction:
1. Row-locks all products (`SELECT FOR UPDATE`)
2. Validates stock and product existence
3. Calculates total server-side (prices from DB, never frontend)
4. Creates Order + OrderItems atomically
5. Decrements stock atomically

This prevents overselling and ensures data consistency under concurrent requests.

### Feature Flags
Simple feature flag system in `lib/features.ts`:
```typescript
export const FEATURES = {
  cart: process.env.NEXT_PUBLIC_ENABLE_CART !== "false",
  trackOrder: process.env.NEXT_PUBLIC_ENABLE_TRACK_ORDER !== "false",
  // ...
};
```
Use `isFeatureEnabled()` to check flags; prefix with `NEXT_PUBLIC_` so they can be set at build time.

## Data Models

- **User**: Accounts with email, password (bcryptjs), role, activation status
- **Product**: Name, price (Decimal), stock, description, category (COOKING/PREMIUM/ORGANIC/INDUSTRIAL), admin who created it (createdByAdminId)
- **Order**: Total amount, status (PENDING/PAID/SHIPPED/DELIVERED/CANCELLED), customer shipping address, phone, optional discount + Razorpay payment refs
- **OrderItem**: Line items linking Order ↔ Product with quantity and price snapshot
- **Review**: Product ratings/comments by customers
- **Discount**: Code-based discounts with percentage, active status, usage tracking

Indexes on frequently-queried columns (products by category/status, orders by user/status).

## Environment Setup

```env
# Required
DATABASE_URL="postgresql://user:password@host:5432/oil_ecommerce"
JWT_SECRET="your-secret-key-here"

# Optional
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_ENABLE_CART="true"
NEXT_PUBLIC_ENABLE_ADMIN_PRODUCTS="true"
# ... other feature flags
```

Copy `.env.example` → `.env.local` and fill in your PostgreSQL connection.

## Important Next.js Notes

This is **Next.js 16 with the app directory**, which has breaking changes from earlier versions:
- Read guides in `node_modules/next/dist/docs/` before writing new API routes or pages
- Heed deprecation notices in error messages
- Route groups like `(auth)`, `(shop)` don't affect URLs but organize code by role/feature

## Common Development Tasks

### Adding a New API Endpoint
1. Create route file under `app/api/[feature]/route.ts`
2. Extract auth/validation in the handler using `requireAuth()` or `requireRole()`
3. Delegate business logic to a service (e.g., `orderService.createOrder()`)
4. Return JSON with proper HTTP status codes

### Adding a Feature Behind a Flag
1. Add flag to `lib/features.ts`
2. Prefix env var with `NEXT_PUBLIC_`
3. Check flag in component/page: `isFeatureEnabled('featureName')`

### Running Database Migrations
```bash
pnpm db:migrate     # Create new migration from schema changes
pnpm db:studio      # Visual editor for database (Prisma Studio at http://localhost:5555)
```

### Debugging
- Check server logs in terminal running `pnpm dev` for route execution
- Prisma Studio (`pnpm db:studio`) to inspect/edit database directly
- Browser DevTools for client-side React issues
- `console.log()` in API routes appears in server terminal

## Payment Integration (Razorpay)
Order model has `razorpayOrderId` and `razorpayPaymentId` fields to track payment state. API routes under `app/api/payments/razorpay/` handle order creation and verification.

# System Design: Shri Sameya Village E-Commerce Platform

## Overview

A full-stack, two-role e-commerce platform for cold-pressed oil sales with clean layered architecture, strong separation of concerns, and type safety throughout.

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  (Next.js Pages, React Components, Tailwind CSS + shadcn/ui)   │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ROUTE HANDLER LAYER                         │
│  (/api/* - Validates input, enforces auth, delegates to services)
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SERVICE LAYER                                │
│ (ProductService, OrderService, AdminService, etc.)              │
│ - Business logic                                                 │
│ - Authorization checks                                           │
│ - Transaction coordination                                       │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                   REPOSITORY LAYER                               │
│ (ProductRepository, OrderRepository, UserRepository)             │
│ - Database queries                                               │
│ - Centralized data access                                        │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                                │
│  (PostgreSQL + Prisma ORM)                                       │
│  Users, Products, Orders, OrderItems, Reviews, Discounts        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Role-Based Access Control

### ADMIN Role
**Permissions**:
- ✅ Create, read, update, delete products
- ✅ View all orders and update order status
- ✅ View all users and manage user accounts
- ✅ Create and manage discount codes
- ✅ View platform analytics and revenue

**Access**:
- Routes: `/admin/*`, `/api/admin/*`
- Authorization: `await requireRole([Role.ADMIN])`

### USER Role
**Permissions**:
- ✅ Browse public products
- ✅ Create orders / add to cart
- ✅ View own orders and order history
- ✅ Leave reviews and ratings
- ✅ Apply discount codes
- ✅ Manage own account

**Access**:
- Routes: `/`, `/products/*`, `/checkout`, `/orders`, etc.
- Authorization: `await requireAuth()` for order operations

---

## Data Model

```
┌────────────────────────────────────────────────────────────────┐
│                          USER                                   │
├────────────────────────────────────────────────────────────────┤
│ id (CUID)                    │ email (unique)                   │
│ password (bcryptjs)          │ name (optional)                  │
│ role (ADMIN | USER)          │ isActive (Boolean)               │
│ createdAt / updatedAt                                          │
├─ Relationships ────────────────────────────────────────────────┤
│ ◄── productsCreated (1:M) Product                              │
│ ◄── orders (1:M) Order                                         │
│ ◄── reviews (1:M) Review                                       │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                         PRODUCT                                 │
├────────────────────────────────────────────────────────────────┤
│ id (CUID)                    │ name                             │
│ price (Decimal 10,2)         │ stock (Int)                      │
│ description (Text)           │ image (URL)                      │
│ category (COOKING|PREMIUM|   │ isActive (Boolean)               │
│           ORGANIC|INDUSTRIAL)                                   │
│ createdByAdminId (FK→User)   │ createdAt / updatedAt            │
├─ Indexes ──────────────────────────────────────────────────────┤
│ • (isActive, createdAt DESC) - Browse products                 │
│ • (isActive, category, createdAt DESC) - Filter by category    │
│ • (createdByAdminId, isActive, createdAt DESC) - Admin view    │
│ • (name) - Search                                              │
├─ Relationships ────────────────────────────────────────────────┤
│ ──► createdByAdmin (M:1) User                                  │
│ ◄── orderItems (1:M) OrderItem                                 │
│ ◄── reviews (1:M) Review                                       │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                          ORDER                                  │
├────────────────────────────────────────────────────────────────┤
│ id (CUID)                    │ userId (FK→User)                 │
│ status (PENDING|PAID|SHIPPED │ totalAmount (Decimal 10,2)      │
│         |DELIVERED|CANCELLED)│ discountAmount (Decimal 10,2)   │
│ shippingAddress              │ phone                            │
│ discountId (FK→Discount)     │ razorpayOrderId                  │
│ razorpayPaymentId            │ createdAt / updatedAt            │
├─ Indexes ──────────────────────────────────────────────────────┤
│ • (userId) - User's order history                              │
│ • (status) - Filter by status                                  │
│ • (createdAt) - Recent orders                                  │
│ • (discountId) - Discount tracking                             │
├─ Relationships ────────────────────────────────────────────────┤
│ ──► user (M:1) User                                            │
│ ──► discount (M:1) Discount                                    │
│ ◄── items (1:M) OrderItem (Cascade delete)                     │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                       ORDERITEM                                 │
├────────────────────────────────────────────────────────────────┤
│ id (CUID)                    │ orderId (FK→Order)               │
│ productId (FK→Product)       │ quantity (Int)                   │
│ price (Decimal 10,2)         │ (price snapshot at order time)   │
├─ Constraint ───────────────────────────────────────────────────┤
│ • UNIQUE(orderId, productId) - One line per product per order  │
├─ Indexes ──────────────────────────────────────────────────────┤
│ • (orderId) - Order details lookup                             │
│ • (productId) - Product sales tracking                         │
├─ Relationships ────────────────────────────────────────────────┤
│ ──► order (M:1) Order (Restrict delete)                        │
│ ──► product (M:1) Product (Restrict delete)                    │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                        REVIEW                                   │
├────────────────────────────────────────────────────────────────┤
│ id (CUID)                    │ productId (FK→Product)           │
│ userId (FK→User)             │ rating (Int, 1-5)                │
│ comment (Text)               │ createdAt                        │
├─ Indexes ──────────────────────────────────────────────────────┤
│ • (productId) - Reviews for product                            │
│ • (userId) - User's reviews                                    │
├─ Relationships ────────────────────────────────────────────────┤
│ ──► product (M:1) Product (Cascade delete)                     │
│ ──► user (M:1) User (Cascade delete)                           │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                       DISCOUNT                                  │
├────────────────────────────────────────────────────────────────┤
│ id (CUID)                    │ code (unique)                    │
│ description                  │ percentage (Float)               │
│ isActive (Boolean)           │ usageCount (Int)                 │
│ createdAt / updatedAt                                          │
├─ Indexes ──────────────────────────────────────────────────────┤
│ • (code) - Quick lookup                                        │
│ • (isActive) - Filter active codes                             │
├─ Relationships ────────────────────────────────────────────────┤
│ ◄── orders (1:M) Order                                         │
└────────────────────────────────────────────────────────────────┘
```

---

## Key Design Patterns

### 1. Layered Architecture

**Route Handler** → **Service** → **Repository** → **Database**

```typescript
// app/api/admin/products/route.ts (Route Handler)
export async function POST(req: Request) {
  const admin = await requireRole([Role.ADMIN]);
  const data = createProductSchema.parse(await req.json());
  
  // Delegate to service
  const product = await productService.createProduct(admin.id, data);
  
  return Response.json({ data: product }, { status: 201 });
}

// server/services/product.service.ts (Service Layer)
async createProduct(adminId: string, data: CreateProductInput) {
  // Validation logic
  const validated = validateProductData(data);
  
  // Delegate to repository
  return productRepository.create({
    ...validated,
    createdByAdminId: adminId,
  });
}

// server/repositories/product.repository.ts (Repository Layer)
async create(data: CreateProductData) {
  return db.product.create({
    data,
    select: { /* full product */ },
  });
}
```

### 2. Type-Safe Data Flow

```typescript
// Input validation at boundary
const schema = z.object({
  name: z.string().min(1).max(200),
  price: z.number().positive(),
  stock: z.number().nonnegative(),
  category: z.enum(['COOKING', 'PREMIUM', 'ORGANIC', 'INDUSTRIAL']),
});

// Types flow through all layers
interface CreateProductInput extends z.infer<typeof schema> {}

// Repositories return typed data
async getProduct(id: string): Promise<ProductDetail | null> { ... }

// Services work with types
async updateProduct(id: string, data: Partial<ProductDetail>) { ... }

// Routes are fully typed
return Response.json<ApiResponse<ProductDetail>>({ data: product });
```

### 3. Transaction Safety for Orders

**Problem**: Race condition when multiple requests try to buy the last 2 units

**Solution**: Database transaction with row-level locking

```typescript
async createOrder(userId: string, input: CreateOrderInput) {
  return db.$transaction(async (tx) => {
    // Step 1: Lock product rows to prevent concurrent modification
    const lockedProducts = await tx.$queryRaw`
      SELECT id, name, price, stock FROM "Product"
      WHERE id = ANY(${productIds}::text[])
        AND "isActive" = true
      FOR UPDATE
    `;

    // Step 2: Validate stock against current (locked) state
    for (const item of items) {
      const product = lockedProducts.find(p => p.id === item.productId);
      if (!product || product.stock < item.quantity) {
        throw new InsufficientStockError(product?.name || item.productId);
      }
    }

    // Step 3: Calculate total from database prices (never trust client)
    const totalAmount = calculateFromDbPrices(lockedProducts, items);

    // Step 4: Create order atomically
    const order = await tx.order.create({
      data: { userId, totalAmount, items: { create: items } },
    });

    // Step 5: Decrement stock atomically
    await Promise.all(
      items.map(item =>
        tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      )
    );

    return { id: order.id };
  });
}
```

**Result**: Safe, atomic order creation with no overselling

### 4. Authorization Pattern

**All protected routes**:
1. Check if user exists: `await requireAuth()`
2. Check role: `await requireRole([Role.ADMIN])`
3. Verify object ownership (if needed): `if (resource.userId !== user.id) throw`

```typescript
// Public route (no auth needed)
GET /api/products

// User-level auth
POST /api/orders
  ├─ requireAuth() checks JWT
  └─ Creates order for current user

// Admin-only
POST /api/admin/products
  ├─ requireAuth() checks JWT
  ├─ requireRole([Role.ADMIN]) checks role
  └─ Creates product

// Admin with audit
PATCH /api/admin/products/[id]
  ├─ requireAuth()
  ├─ requireRole([Role.ADMIN])
  ├─ Verify product exists
  └─ Update (logs which admin changed it)
```

---

## API Endpoints

### Authentication (Public)
```
POST   /api/auth/register        - Create user account (default role: USER)
POST   /api/auth/login           - Login (returns JWT in httpOnly cookie)
POST   /api/auth/logout          - Logout (clear cookie)
GET    /api/auth/me              - Current user info (requires auth)
```

### Products (Public Browse, Admin Manage)
```
GET    /api/products             - List products (paginated, filterable)
GET    /api/products/[id]        - Product details
POST   /api/products/[id]/reviews - Add review (requires auth)
GET    /api/products/[id]/reviews - Get reviews

POST   /api/admin/products       - Create product (admin only)
GET    /api/admin/products       - List all products incl. inactive (admin)
PATCH  /api/admin/products/[id]  - Edit product (admin only)
DELETE /api/admin/products/[id]  - Delete product (soft delete, admin only)
```

### Orders (User Create/View, Admin Manage)
```
POST   /api/orders               - Create order (user auth required)
GET    /api/orders               - User's orders
GET    /api/orders/[id]          - Order details (user sees own, admin sees all)

GET    /api/admin/orders         - All orders (admin only)
PATCH  /api/admin/orders/[id]/status - Update status (admin only)
```

### Discounts
```
POST   /api/discounts/validate   - Check if code is valid (public)

POST   /api/admin/discounts      - Create discount (admin only)
GET    /api/admin/discounts      - List discounts (admin only)
PATCH  /api/admin/discounts/[id] - Edit discount (admin only)
DELETE /api/admin/discounts/[id] - Delete discount (admin only)
```

### Admin Dashboard
```
GET    /api/admin/stats          - Platform stats (admin only)
GET    /api/admin/users          - List all users (admin only)
PATCH  /api/admin/users/[id]     - Update user role/status (admin only)
```

### Payments (External)
```
POST   /api/payments/razorpay/create-order   - Initiate payment
POST   /api/payments/razorpay/verify         - Verify payment
```

---

## Session Management

### JWT + HTTP-Only Cookies

```typescript
// createSession() - Called on login
const token = await new SignJWT({ id, email, role })
  .setProtectedHeader({ alg: "HS256" })
  .setExpirationTime("24h")
  .sign(SECRET);

cookieStore.set("session", token, {
  httpOnly: true,        // JS cannot access
  secure: true,          // HTTPS only in production
  sameSite: "lax",       // CSRF protection
  path: "/",
  maxAge: 86400,         // 24 hours
});

// getCurrentUser() - Called on each protected request
const token = cookieStore.get("session")?.value;
const { payload } = await jwtVerify(token, SECRET);
return payload as SessionPayload; // { id, email, role }
```

**Benefits**:
- ✅ Secure: JS can't access token
- ✅ Automatic: Sent with every request
- ✅ CSRF-safe: sameSite=lax prevents cross-site form attacks
- ✅ Expiration: Token expires in 24h

---

## Error Handling

### Custom Error Types

```typescript
// Clear, specific errors throughout the codebase

export class ProductNotFoundError extends Error {
  constructor(public productId: string) {
    super(`Product not found: ${productId}`);
    this.name = "ProductNotFoundError";
  }
}

export class InsufficientStockError extends Error {
  constructor(public productName: string) {
    super(`Insufficient stock for: ${productName}`);
    this.name = "InsufficientStockError";
  }
}

export class ProductAccessError extends Error {
  constructor() {
    super("Not authorized to modify this product");
    this.name = "ProductAccessError";
  }
}

// Route handlers catch and return proper HTTP responses
try {
  const order = await orderService.createOrder(user.id, input);
  return Response.json({ data: order }, { status: 201 });
} catch (err) {
  if (err instanceof InsufficientStockError) {
    return Response.json(
      { error: err.message },
      { status: 400 }
    );
  }
  if (err instanceof ProductNotFoundError) {
    return Response.json(
      { error: err.message },
      { status: 404 }
    );
  }
  // Generic error
  return Response.json(
    { error: "Internal server error" },
    { status: 500 }
  );
}
```

---

## Performance Considerations

### Database Indexes

```prisma
// Fast product browsing
@@index([isActive, createdAt(sort: Desc)])
@@index([isActive, category, createdAt(sort: Desc)])

// Fast user order history lookup
@@index([userId])

// Fast order status filtering
@@index([status])

// Fast search
@@index([name])
```

### Query Optimization

```typescript
// ✅ Good: Fetch only needed fields
await db.product.findMany({
  select: { id: true, name: true, price: true },
  where: { isActive: true },
  take: 12,
});

// ❌ Bad: Fetch entire objects for list
const products = await db.product.findMany();
const publicProducts = products
  .filter(p => p.isActive)
  .map(p => ({ id: p.id, name: p.name, price: p.price }));
```

### Pagination

```typescript
// All list endpoints support pagination
GET /api/products?page=1&limit=12
GET /api/admin/orders?page=1&limit=20

Response: {
  data: [...],
  total: 150,
  page: 1,
  totalPages: 8,
}
```

---

## Security Measures

| Threat | Mitigation |
|--------|------------|
| **SQL Injection** | Prisma ORM parameterizes all queries |
| **XSS** | React escapes output by default |
| **CSRF** | SameSite=Lax cookies + token validation |
| **Session Hijacking** | HTTPOnly cookies + HTTPS + 24h expiration |
| **Unauthorized Access** | requireAuth() + requireRole() at API boundary |
| **Price Tampering** | Prices calculated server-side from DB, never client-side |
| **Race Conditions** | Atomic transactions with row-level locking |
| **Password Storage** | bcryptjs with salt rounds |

---

## Deployment Readiness

### Environment Variables Required
```env
DATABASE_URL=postgresql://user:pass@host:5432/oil_ecommerce
JWT_SECRET=long-random-string-min-32-chars
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Production Checklist
- [ ] Database: PostgreSQL 12+, backups enabled
- [ ] Environment variables: All required vars set
- [ ] JWT_SECRET: Long, random, changed from default
- [ ] HTTPS: SSL certificate installed
- [ ] Session cookies: `secure: true` enabled
- [ ] CORS: Configured if API accessed from external domains
- [ ] Logging: Error tracking (Sentry, etc.)
- [ ] Monitoring: Database performance, API latency
- [ ] Backups: Daily automated backups with retention
- [ ] Disaster Recovery: Tested restore procedures

---

## Future Enhancements (Out of Scope)

- [ ] Wishlist / favorites
- [ ] Product recommendations (ML-based)
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Multi-currency support
- [ ] Shipping carrier integration
- [ ] Inventory reservations (hold for X minutes)
- [ ] Product variants (bottle sizes, quantities)
- [ ] Promotional campaigns
- [ ] Customer analytics dashboard
- [ ] Subscription / recurring orders

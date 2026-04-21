import { NextRequest, NextResponse } from 'next/server';
import { orderService } from '@/server/services/order.service';
import { CreateOrderSchema } from '@/server/validations';
import { requireAuth } from '@/server/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    const { searchParams } = request.nextUrl;
    const page = Math.max(1, Number(searchParams.get('page') ?? '1'));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') ?? '10')));

    const userId = user.role === 'ADMIN' || user.role === 'SELLER' ? undefined : user.id;

    const orders = await orderService.getOrders(page, limit, userId);

    return NextResponse.json(orders);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    if (user.role !== 'USER') {
      return NextResponse.json({ error: 'Forbidden. Only users can buy.' }, { status: 403 });
    }

    const body = await request.json();
    const result = CreateOrderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid data', details: result.error.flatten() }, { status: 400 });
    }

    const order = await orderService.createOrder(user.id, { items: result.data.items });
    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

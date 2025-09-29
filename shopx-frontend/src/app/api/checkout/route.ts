import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// POST: ثبت سفارش از سبد خرید
// payload expected: { customer, phone, address, items: [{ productId, qty }] }
export async function POST(req: Request) {
  const body = await req.json();
  if (!body.customer || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // محاسبه قیمت‌ها از دیتابیس برای امنیت
  const productIds = body.items.map((i: any) => i.productId);
  const dbProducts = await prisma.product.findMany({ where: { id: { in: productIds } } });

  const items = body.items.map((i: any) => {
    const p = dbProducts.find(dp => dp.id === i.productId);
    if (!p) throw new Error('Product not found: ' + i.productId);
    return { productId: p.id, qty: Number(i.qty), price: p.price };
  });

  const total = items.reduce((sum: number, it: any) => sum + it.price * it.qty, 0);

  const order = await prisma.order.create({
    data: {
      customer: body.customer,
      phone: body.phone,
      address: body.address,
      total,
      items: { create: items }
    },
    include: { items: true }
  });

  return NextResponse.json(order, { status: 201 });
}
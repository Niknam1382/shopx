import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET: لیست سفارش‌ها
export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } } }
  });
  return NextResponse.json(orders);
}
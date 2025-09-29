import { prisma, prisma as db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET: جزئیات سفارش
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: { include: { product: true } } }
  });
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(order);
}

// PUT: تغییر وضعیت یا اطلاعات سفارش
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const order = await db.order.update({
    where: { id: params.id },
    data: { status: body.status, address: body.address, phone: body.phone }
  });
  return NextResponse.json(order);
}

// DELETE: حذف سفارش
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await db.order.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
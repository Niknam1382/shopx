import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET: یک محصول
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

// PUT: ویرایش محصول
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const product = await prisma.product.update({
    where: { id: params.id },
    data: { title: body.title, price: body.price, image: body.image },
  });
  return NextResponse.json(product);
}

// DELETE: حذف محصول
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET: لیست محصولات
export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(products);
}

// POST: افزودن محصول
export async function POST(req: Request) {
  const body = await req.json();
  if (!body.title || typeof body.price !== 'number') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const product = await prisma.product.create({
    data: { title: body.title, price: body.price, image: body.image },
  });
  return NextResponse.json(product, { status: 201 });
}
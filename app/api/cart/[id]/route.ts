import { prisma } from '@/prisma/prisma';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		const data = (await req.json()) as { quantity: number };
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ message: 'Cart token are nof found' }, { status: 400 });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id,
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' }, { status: 400 });
		}

		await prisma.cartItem.update({
			where: {
				id,
			},
			data: {
				quantity: data.quantity,
			},
		});

		const updateUserCart = await updateCartTotalAmount(token);

		return NextResponse.json(updateUserCart);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ message: 'Cart token are nof found' }, { status: 400 });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id,
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' }, { status: 400 });
		}

		await prisma.cartItem.delete({
			where: {
				id: cartItem.id,
			},
		});

		const updateUserCart = await updateCartTotalAmount(token);

		return NextResponse.json(updateUserCart);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 });
	}
}

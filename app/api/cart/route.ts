import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';

export async function GET(req: NextRequest) {
	try {
		const userId = 1;

		const tokenId = req.cookies.get('cartToken')?.value;

		if (!tokenId) {
			return NextResponse.json({ items: [], totalAmount: 0 });
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						userId,
					},
					{
						tokenId,
					},
				],
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (error) {
		console.error(error);
	}
}

export async function POST(req: NextRequest) {
	try {
		const userId = 1;

		let tokenId = req.cookies.get('cartToken')?.value;

		if (!tokenId) {
			tokenId = crypto.randomUUID();
		}

		const userCart = await findOrCreateCart(tokenId);

		const data = (await req.json()) as CreateCartItemValues;

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				ingredients: { every: { id: { in: data.ingredients } } },
			},
		});

		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			});

			const updatedUserCart = await updateCartTotalAmount(tokenId);

			const resp = NextResponse.json(updatedUserCart);
			resp.cookies.set('cartToken', tokenId);
			return resp;
		}

		await prisma.cartItem.create({
			data: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				quantity: 1,
				ingredients: {
					connect: data.ingredients?.map((id) => ({
						id,
					})),
				},
			},
		});

		const updatedUserCart = await updateCartTotalAmount(tokenId);

		return NextResponse.json(updatedUserCart);
	} catch (error) {
		console.error(error);
	}
}

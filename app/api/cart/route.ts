import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

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

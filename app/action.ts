'use server';

import { CheckoutFormValues } from '@/components/shared/checkout/schemas/checkout-form-schema';
import { PayOrder } from '@/components/shared/email-templates/pay-order';
import { prisma } from '@/prisma/prisma';
import { sendEmail } from '@/shared/lib/send-email';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues) {
	console.log(data);

	const cookieStore = cookies();
	const cartToken = cookieStore.get('cartToken')?.value;

	if (!cartToken) {
		throw new Error('Cart token not found');
	}

	const userCart = await prisma.cart.findFirst({
		include: {
			user: true,
			items: {
				include: {
					ingredients: true,
					productItem: {
						include: {
							product: true,
						},
					},
				},
			},
		},
		where: {
			tokenId: cartToken,
		},
	});

	if (!userCart) {
		throw new Error('Cart not found');
	}

	if (userCart?.totalAmount === 0) {
		throw new Error('Cart is empty');
	}

	const order = await prisma.order.create({
		data: {
			fullName: data.firstName + ' ' + data.lastName,
			address: data.address,
			email: data.email,
			status: OrderStatus.PENDING,
			phone: data.phone,
			token: cartToken,
			items: JSON.stringify(userCart.items),
			totalAmount: userCart.totalAmount,
			comment: data.comment,
		},
	});

	await prisma.cart.update({
		where: {
			id: userCart.id,
		},
		data: {
			totalAmount: 0,
		},
	});

	await prisma.cartItem.deleteMany({
		where: {
			cartId: userCart.id,
		},
	});

	await sendEmail(
		data.email,
		`Next Pizza | Оплатите заказ #${order.id}`,
		PayOrder({
			orderId: order.id,
			totalAmount: order.totalAmount,
			paymentUrl:
				'https://www.google.com/webhp?hl=ru&sa=X&ved=0ahUKEwjl1_Drgt2KAxXN9gIHHdFcN_4QPAgI',
		}),
	);

	return '';
}

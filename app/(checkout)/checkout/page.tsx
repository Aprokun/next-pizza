'use client';

import { createOrder } from '@/app/action';
import { CheckoutAddress } from '@/components/shared/checkout-address';
import { CheckoutSidebar } from '@/components/shared/checkout-sidebar';
import { CheckoutUserInfo } from '@/components/shared/checkout-user-info';
import { CheckoutCart } from '@/components/shared/checkout/checkout-cart';
import {
	checkoutFormsSchema,
	CheckoutFormValues,
} from '@/components/shared/checkout/schemas/checkout-form-schema';
import Container from '@/components/shared/container';
import Title from '@/components/shared/title';
import { useCart } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
	const [submitting, setSubmitting] = useState(false);
	const { items, totalAmount, loading, removeCartItem, updateItemQuantity } = useCart();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormsSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	});

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true);

			const url = await createOrder(data);

			toast.success('Заказ успешно оформлен! Переход на страницу оплаты...');

			if (url) {
				location.href = url;
			}
		} catch (error) {
			console.error(error);
			toast.error('Не удалось создать заказ');
		}
	};

	const onClickCountButton = async (id: number, quantity: number, type: 'plus' | 'minus') => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		await updateItemQuantity(id, newQuantity);
	};

	return (
		<Container className='mt-10'>
			<Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]' />
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						<div className='flex flex-col gap-10 flex-1 mb-20'>
							<CheckoutCart
								items={items}
								loading={loading}
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
							/>

							<CheckoutUserInfo className={cn({ 'opacity-40 pointer-events-none': loading })} />

							<CheckoutAddress />
						</div>
						<CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}

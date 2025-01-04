'use client';

import { CheckoutItem } from '@/components/shared/checkout-item';
import { CheckoutSidebar } from '@/components/shared/checkout-sidebar';
import Container from '@/components/shared/container';
import Title from '@/components/shared/title';
import { WhiteBlock } from '@/components/shared/white-block';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details';

export default function CheckoutPage() {
	const { items, totalAmount, loading, removeCartItem, updateItemQuantity } = useCart();

	const onClickCountButton = async (id: number, quantity: number, type: 'plus' | 'minus') => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		await updateItemQuantity(id, newQuantity);
	};

	return (
		<Container className='mt-10'>
			<Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]' />
			<div className='flex flex-row gap-10'>
				<div className='flex flex-col gap-10 flex-1 mb-20'>
					<WhiteBlock title='1.Корзина'>
						{items.map((item) => (
							<CheckoutItem
								className='mb-5'
								key={item.id}
								id={item.id}
								imageUrl={item.imageUrl}
								name={item.name}
								quantity={item.quantity}
								price={item.price}
								disabled={item.disabled}
								details={getCartItemDetails(
									item.ingredients,
									item.pizzaType as PizzaType,
									item.pizzaSize as PizzaSize,
								)}
								onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
								onClickRemove={() => removeCartItem(item.id)}
							/>
						))}
					</WhiteBlock>

					<WhiteBlock title='2.Персональные данные'>
						<div className='grid grid-cols-2 gap-5'>
							<Input name='firstName' className='text-base' placeholder='Имя' />
							<Input name='lastName' className='text-base' placeholder='Фамилия' />
							<Input name='email' className='text-base' placeholder='Email' />
							<Input name='phone' className='text-base' placeholder='Номер телефона' />
						</div>
					</WhiteBlock>

					<WhiteBlock title='3.Адрес доставки'>
						<div className='flex flex-col gap-5'>
							<Input name='address' className='text-base' placeholder='Адрес' />
							<Textarea className='text-base' placeholder='Комментарий к заказу' rows={5} />
						</div>
					</WhiteBlock>
				</div>
				<CheckoutSidebar loading={loading} totalAmount={totalAmount} />
			</div>
		</Container>
	);
}

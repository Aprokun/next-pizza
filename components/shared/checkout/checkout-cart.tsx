import React, { FC } from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';

type Props = {
	items: CartStateItem[];
	onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
	loading?: boolean;
	removeCartItem: (id: number) => void;
};

export const CheckoutCart: FC<Props> = ({ items, loading, onClickCountButton, removeCartItem }) => {
	return (
		<WhiteBlock title='1.Корзина'>
			<div className='flex flex-col gap-5'>
				{loading && [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)}

				{!loading && items.length > 0 && items.map((item) => (
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
			</div>
		</WhiteBlock>
	);
};

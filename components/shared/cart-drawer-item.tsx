'use client';

import React, { FC } from 'react';
import { CartItemDetailsImage } from '@/components/shared/cart-item-details/cart-item-details-image';
import { CartItemProps } from '@/components/shared/cart-item-details/cart-item-details.types';
import { CartItemInfo } from '@/components/shared/cart-item-details/cart-item-info';
import { CountButton } from '@/components/shared/count-button';
import { CartItemDetailsPrice } from '@/components/shared/cart-item-details/cart-item-details-price';
import { Trash2Icon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type Props = {
	className?: string;
	onClickCountButton?: (type: 'plus' | 'minus') => void;
	onClickRemove?: () => void;
	cartItem: CartItemProps;
};

const CartDrawerItem: FC<Props> = ({ className, cartItem, onClickCountButton, onClickRemove }) => {
	const { imageUrl, name, details, price, quantity } = cartItem;

	return (
		<div className={cn(className, 'bg-white p-3')}>
			<CartItemDetailsImage src={imageUrl} />

			<div className='flex-1'>
				<CartItemInfo name={name} details={details} />
				<hr className='my-3' />
				<div className='flex items-center justify-between'>
					<CountButton onClick={onClickCountButton} value={quantity} />

					<div className='flex items-center gap-3'>
						<CartItemDetailsPrice value={price} />
						<Trash2Icon
							onClick={onClickRemove}
							className='text-gray-400 cursor-pointer hover:text-gray-400'
							size={16}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartDrawerItem;

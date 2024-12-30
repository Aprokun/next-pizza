'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { CartDrawer } from '@/components/shared/cart-drawer';
import { useCartStore } from '@/shared/store/cart';

type Props = {
	className?: string;
};

export const CartButton: FC<Props> = ({ className }) => {
	const totalAmount = useCartStore((state) => state.totalAmount);
	const price = useCartStore((state) =>
		state.items.reduce((acc, item) => {
			return acc + item.price;
		}, 0),
	);

	return (
		<CartDrawer>
			<Button className={cn('group relative', className)}>
				<b>{price} RUB</b>
				<span className='h-full w-[1px] bg-white/30 mx-3'></span>
				<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
					<ShoppingCart className='relative' strokeWidth={2} size={16} />
					<b>{totalAmount}</b>
				</div>
				<ArrowRight
					className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0'
					size={20}
				/>
			</Button>
		</CartDrawer>
	);
};

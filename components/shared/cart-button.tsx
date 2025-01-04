'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { CartDrawer } from '@/components/shared/cart-drawer';
import { useCartStore } from '@/shared/store/cart';

type Props = {
	className?: string;
	showCartButton: boolean;
};

export const CartButton: FC<Props> = ({ showCartButton, className }) => {
	const [itemsCount, loading, totalAmount] = useCartStore((state) => [
		state.items.length,
		state.loading,
		state.totalAmount,
	]);

	return (
		<div hidden={!showCartButton}>
			<CartDrawer>
				<Button
					loading={loading}
					className={cn('group relative', { 'w-[105px]': loading }, className)}
				>
					<b>{totalAmount} ₽</b>
					<span className='h-full w-[1px] bg-white/30 mx-3'></span>
					<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
						<ShoppingCart className='relative' strokeWidth={2} size={16} />
						<b>{itemsCount}</b>
					</div>
					<ArrowRight
						className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0'
						size={20}
					/>
				</Button>
			</CartDrawer>
		</div>
	);
};

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type Props = {
	className?: string;
};

export const CartButtons: FC<Props> = ({ className }) => {
	return (
		<Button className={cn('group relative', className)}>
			<b>520 P</b>
			<span className='h-full w-[1px] bg-white/50 mx-3' />;
			<div className='flex items-center gap-1 transition duration-300 group-hover'>
				<ShoppingCart size={16} className='relative' strokeWidth={2} />
				<b>3</b>
			</div>
			<ArrowRight
				size={20}
				className='absolute right-5 transition duration-300 -translate-x-2 opacity-50'
			/>
		</Button>
	);
};

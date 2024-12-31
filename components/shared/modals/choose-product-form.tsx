import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import Title from '@/components/shared/title';
import { Button } from '@/components/ui/button';

type Props = {
	imageUrl: string;
	name: string;
	price: number;
	loading: boolean;
	className?: string;
	onSubmit?: VoidFunction;
};

export const ChooseProductForm: FC<Props> = ({
	imageUrl,
	name,
	price,
	loading,
	onSubmit,
	className,
}) => {
	return (
		<div className={cn('flex flex-1', className)}>
			<div className='flex items-center justify-center flex-1 relative w-full'>
				<img
					src={imageUrl}
					alt={name}
					className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'
				/>
			</div>

			<div className='w-[490px] bg-[#F7F7F7] p-7'>
				<Title text={name} size='md' className='font-extrabold mb-1' />

				<Button
					loading={loading}
					onClick={() => onSubmit?.()}
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
				>
					Добавить в корзину за {price} Р
				</Button>
			</div>
		</div>
	);
};

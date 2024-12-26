import { Product } from '@prisma/client';
import React, { FC } from 'react';
import Title from '@/components/shared/title';
import { GroupVariants } from '@/components/shared/group-variants';

type Props = {
	product: Product;
};

export const ProductInfo: FC<Props> = ({ product }) => {
	return (
		<div className='w-[490px] bg-[#FCFCFC] p-7'>
			<Title text={product.name} size='xl' className='mb-1 font-extrabold' />

			<p className='text-sm text-gray-400'>25 см, традиционное тесто 25, 380 г</p>

			<GroupVariants
				items={[
					{ name: 'Маленькая', value: '1' },
					{ name: 'Средняя', value: '2' },
					{ name: 'Большая', value: '3' },
				]}
				className='mt-5'
			/>
		</div>
	);
};

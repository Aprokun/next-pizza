import React, { FC } from 'react';
import Link from 'next/link';
import Title from '@/components/shared/title';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';

type Props = {
	id: string;
	name: string;
	price: number;
	ingredients: Ingredient[];
	imageUrl: string;
	className?: string;
};

const ProductCard: FC<Props> = ({ id, name, price, ingredients, imageUrl, className }) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`}>
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
					<img src={imageUrl} alt='Product Photo' />
				</div>

				<Title text={name} size='sm' className='mb-1 mt-3 font-bold' />

				<p className='text-sm text-gray-400'>
					{ingredients.map((ingredient) => ingredient.name).join(', ')}
				</p>

				<div className='flex justify-between items-center mt-4'>
					<span className='text-[20px]'>
						от <b>{price} RUB</b>
					</span>

					<Button variant='secondary' className='text-base font-bold'>
						<Plus size={20} className='mr-1' />
						Добавить
					</Button>
				</div>
			</Link>
		</div>
	);
};

export default ProductCard;

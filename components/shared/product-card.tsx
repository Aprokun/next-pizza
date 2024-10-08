import React, { FC } from 'react';
import Link from 'next/link';
import Title from '@/components/shared/title';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type Props = {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	className?: string;
};

const ProductCard: FC<Props> = ({ id, name, price, imageUrl, className }) => {
	return (
		<div className={className}>
			<Link href={'/product/1'}>
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
					<img src={imageUrl} alt='Product Photo' />
				</div>

				<Title text={name} size='sm' className='mb-1 mt-3 font-bold' />

				<p className='text-sm text-gray-400'>
					Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус
					альфредо, чеснок
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

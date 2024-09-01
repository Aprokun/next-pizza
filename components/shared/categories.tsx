'use client';

import React, { FC } from 'react';
import { cn } from '@/lib/utils';

type Props = {
	className?: string;
};

const categories = [
	'Пиццы',
	'Комбо',
	'Закуски',
	'Коктейли',
	'Кофе',
	'Напитки',
	'Десерты',
];

let activeIndex = 0;

const Categories: FC<Props> = ({ className }) => {
	const categoryOnClick = (index: number) => {
		activeIndex = index;
	};

	return (
		<div
			className={cn(className, 'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl')}
		>
			{categories.map((category, index) => (
				<a
					key={index}
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5',
						index === activeIndex &&
							'bg-white shadow-md shadow-gray-200 text-primary',
					)}
				>
					<button onClick={() => categoryOnClick(index)}>{category}</button>
				</a>
			))}
		</div>
	);
};

export default Categories;

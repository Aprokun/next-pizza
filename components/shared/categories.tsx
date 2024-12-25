'use client';

import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';

type Props = {
	items: Category[];
	className?: string;
};

const Categories: FC<Props> = ({ items, className }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId);

	return (
		<div className={cn(className, 'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl')}>
			{items.map(({ id, name }, index) => (
				<a
					key={index}
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5',
						id === categoryActiveId && 'bg-white shadow-md shadow-gray-200 text-primary',
					)}
					href={`/#${name}`}
				>
					<button>{name}</button>
				</a>
			))}
		</div>
	);
};

export default Categories;

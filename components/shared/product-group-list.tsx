'use client';

import React, { FC, useEffect, useRef } from 'react';
import Title from '@/components/shared/title';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/shared/product-card';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';

type Props = {
	title: string;
	items: any[];
	className?: string;
	listClassName?: string;
	categoryId: number;
};

const ProductGroupList: FC<Props> = ({
	className,
	title,
	listClassName,
	items,
	categoryId,
}) => {
	const intersectionRef = useRef(null);
	const intersection = useIntersection(intersectionRef, { threshold: 0.4 });
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
		console.log('category - ', categoryId);
	}, [categoryId, intersection?.isIntersecting, title]);

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size='lg' className='font-extrabold mb-5' />

			<div className={cn(listClassName, 'grid grid-cols-3 gap-[50px]')}>
				{items.map((item, index) => (
					<ProductCard
						key={item.id}
						id={item.id}
						name={item.name}
						price={item.items[0].price}
						imageUrl={item.imageUrl}
					/>
				))}
			</div>
		</div>
	);
};

export default ProductGroupList;

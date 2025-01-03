import TopBar from '@/components/shared/top-bar';
import Title from '@/components/shared/title';
import React, { Suspense } from 'react';
import Container from '@/components/shared/container';
import Filters from '@/components/shared/filters';
import ProductGroupList from '@/components/shared/product-group-list';
import { prisma } from '@/prisma/prisma';
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
	const categories = await findPizzas(searchParams);

	return (
		<>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>

			<TopBar categories={categories.filter((category) => category.products.length > 0)} />

			<Container className='pb-14 mt-10'>
				<div className='flex gap-[60px]'>
					<div className='w-[250px]'>
						<Suspense>
							<Filters />
						</Suspense>
					</div>

					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{categories.map(
								(category) =>
									category.products.length > 0 && (
										<ProductGroupList
											key={category.id}
											title={category.name}
											items={category.products}
											categoryId={category.id}
										/>
									),
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}

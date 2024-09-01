import TopBar from '@/components/shared/top-bar';
import Title from '@/components/shared/title';
import React from 'react';
import Container from '@/components/shared/container';
import Filters from '@/components/shared/filters';
import ProductGroupList from '@/components/shared/product-group-list';

export default function Home() {
	return (
		<>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>

			<TopBar />

			<Container className='pb-14 mt-10'>
				<div className='flex gap-[60px]'>
					<div className='w-[250px]'>
						<Filters />
					</div>

					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							<ProductGroupList
								title='Пиццы'
								items={[
									{
										id: '2',
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif',
										price: 600,
										items: [{ price: 600 }],
									},
									{
										id: '3',
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif',
										price: 600,
										items: [{ price: 600 }],
									},
									{
										id: '4',
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif',
										price: 600,
										items: [{ price: 600 }],
									},
									{
										id: '5',
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif',
										price: 600,
										items: [{ price: 600 }],
									},
									{
										id: '6',
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif',
										price: 600,
										items: [{ price: 600 }],
									},
									{
										id: '7',
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif',
										price: 600,
										items: [{ price: 600 }],
									},
								]}
								categoryId={1}
							/>
							<ProductGroupList
								title='Завтраки'
								items={[
									{
										id: '2',
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif',
										price: 600,
										items: [{ price: 600 }],
									},
									{
										id: '3',
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif',
										price: 600,
										items: [{ price: 600 }],
									},
									{
										id: '4',
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif',
										price: 600,
										items: [{ price: 600 }],
									},
									{
										id: '5',
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif',
										price: 600,
										items: [{ price: 600 }],
									},
									{
										id: '6',
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif',
										price: 600,
										items: [{ price: 600 }],
									},
									{
										id: '7',
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/r:233x233/11EE7D610D2925109AB2E1C92CC5383C.avif',
										price: 600,
										items: [{ price: 600 }],
									},
								]}
								categoryId={2}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}

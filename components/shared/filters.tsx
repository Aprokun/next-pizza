'use client';

import React, { FC } from 'react';
import Title from '@/components/shared/title';
import { Input } from '@/components/ui/input';
import { RangeSlider } from '@/components/shared/range-slider';
import CheckboxFiltersGroup from '@/components/shared/checkbox-filters-group';
import { useRouter } from 'next/navigation';
import { useFilters, useIngredients, useQueryFilters } from '../../shared/hooks';

type Props = {
	className?: string;
};

const Filters: FC<Props> = ({ className }) => {
	const router = useRouter();

	const { ingredients, loading } = useIngredients();
	const filters = useFilters();

	useQueryFilters(filters);

	const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0]);
		filters.setPrices('priceTo', prices[1]);
	};

	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

			<CheckboxFiltersGroup
				title='Размеры'
				name='sizes'
				className='mb-5'
				onClickCheckbox={filters.setSizes}
				selectedValues={filters.sizes}
				items={[
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' },
				]}
			/>

			<CheckboxFiltersGroup
				title='Типы теста'
				name='pizzaTypes'
				className='mb-5'
				onClickCheckbox={filters.setPizzaTypes}
				selectedValues={filters.pizzaTypes}
				items={[
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' },
				]}
			/>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={1000}
						defaultValue={0}
						value={String(filters.prices.priceFrom || '0')}
						onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
					/>
					<Input
						type='number'
						placeholder='1000'
						min={0}
						max={1000}
						defaultValue={0}
						value={String(filters.prices.priceTo || '1000')}
						onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
					onValueChange={updatePrices}
				/>
			</div>

			<CheckboxFiltersGroup
				title='Ингридиенты'
				className='mt-5'
				items={items}
				limit={6}
				loading={loading}
				defaultItems={items.slice(0, 6)}
				onClickCheckbox={filters.setSelectedIngredients}
				selectedValues={filters.selectedIngredients}
				name='ingredients'
			/>
		</div>
	);
};

export default Filters;

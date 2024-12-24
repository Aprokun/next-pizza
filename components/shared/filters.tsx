'use client';

import React, { FC } from 'react';
import Title from '@/components/shared/title';
import FilterCheckbox from '@/components/shared/filter-checkbox';
import { Input } from '@/components/ui/input';
import { RangeSlider } from '@/components/shared/range-slider';
import CheckboxFiltersGroup from '@/components/shared/checkbox-filters-group';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

type Props = {
	className?: string;
};

const Filters: FC<Props> = ({ className }) => {
	const { ingredients } = useFilterIngredients();

	const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

			<div className='flex flex-col gap-4'>
				<FilterCheckbox text='Можно собирать' value='1' />
				<FilterCheckbox text='Новинки' value='2' />
			</div>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена:</p>
				<div className='flex gap-3 mb-5'>
					<Input type='number' placeholder='0' min={0} max={1000} defaultValue={0} />
					<Input type='number' placeholder='1000' min={0} max={1000} defaultValue={0} value={500} />
				</div>
				<RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
			</div>

			<CheckboxFiltersGroup
				title='Ингридиенты'
				className='mt-5'
				items={items}
				limit={6}
				defaultItems={items.slice(0, 6)}
			/>
		</div>
	);
};

export default Filters;

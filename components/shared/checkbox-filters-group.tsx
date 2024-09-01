'use client';

import React, { ChangeEvent, FC, useState } from 'react';
import FilterCheckbox, {
	FilterCheckboxProps,
} from '@/components/shared/filter-checkbox';
import { Input } from '@/components/ui/input';

type Item = FilterCheckboxProps;

type Props = {
	className?: string;
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	onChange?: (values: string[]) => void;
	defaultValue?: string[];
};

const CheckboxFiltersGroup: FC<Props> = ({
	className,
	title,
	items,
	defaultItems,
	defaultValue,
	onChange,
	searchInputPlaceholder,
	limit,
}) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const list = showAll
		? items.filter((item) =>
				item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()),
			)
		: defaultItems?.slice(0, limit);

	const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			{showAll && (
				<div className='mb-5'>
					<Input
						placeholder={searchInputPlaceholder}
						className='bg-gray-50 border-none'
						onChange={onChangeSearchInput}
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list &&
					list.map((item, index) => (
						<FilterCheckbox
							key={index}
							text={item.text}
							value={item.value}
							endAdornment={item.endAdornment}
							onCheckedChange={(ids) => console.log(ids)}
							checked={false}
						/>
					))}
			</div>

			{limit && items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button
						onClick={() => setShowAll(!showAll)}
						className='text-primary mt-3'
					>
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)}
		</div>
	);
};

export default CheckboxFiltersGroup;

import React, { FC } from 'react';
import Title from '@/components/shared/title';
import FilterCheckbox from '@/components/shared/filter-checkbox';

type Props = {
	className?: string;
};

const Filters: FC<Props> = ({ className }) => {
	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

			<div className='flex flex-col gap-4'>
				<FilterCheckbox text='Можно собирать' value='1' />
				<FilterCheckbox text='Новинки' value='2' />
			</div>
		</div>
	);
};

export default Filters;

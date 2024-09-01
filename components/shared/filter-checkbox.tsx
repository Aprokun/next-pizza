import React, { FC, ReactNode } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
	text: string;
	value: string;
	endAdornment?: ReactNode;
	onCheckedChange?: (checked: boolean) => void;
	checked?: boolean;
};

const FilterCheckbox: FC<Props> = ({
	text,
	value,
	endAdornment,
	onCheckedChange,
	checked,
}) => {
	return (
		<div className='flex items-center space-x-2'>
			<Checkbox
				onCheckedChange={onCheckedChange}
				checked={checked}
				value={value}
				className='rounded-[8px] w-6 h-6'
				id={`checkbox-${String(value)}`}
			/>
			<label
				htmlFor={`checkbox-${String(value)}`}
				className='leading-none cursor-pointer flex-1'
			>
				{text}
			</label>
			{endAdornment}
		</div>
	);
};

export default FilterCheckbox;

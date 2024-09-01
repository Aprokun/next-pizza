import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';

type Props = {
	className?: string;
};

const SortPopup: FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				className,
				'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
			)}
		>
			<ArrowUpDown size={16} />
			<b>Сортировка:</b>
			<b className='text-primary'>популярное</b>
		</div>
	);
};

export default SortPopup;

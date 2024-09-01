import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import Categories from '@/components/shared/categories';
import SortPopup from '@/components/shared/sort-popup';
import Container from '@/components/shared/container';

type Props = {
	className?: string;
};

const TopBar: FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				className,
				'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
			)}
		>
			<Container className='flex items-center justify-between'>
				<Categories />
				<SortPopup />
			</Container>
		</div>
	);
};

export default TopBar;

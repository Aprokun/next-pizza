import React, { FC, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type Props = {
	className?: string;
};

const Container: FC<PropsWithChildren<Props>> = ({ className, children }) => {
	return (
		<div className={cn(className, 'mx-auto max-w-[1280px]')}>{children}</div>
	);
};

export default Container;

import { cn } from '@/shared/lib/utils';
import React, { FC } from 'react';

type Props = {
	text: string;
	className?: string;
};

export const ErrorText: FC<Props> = ({ text, className }) => {
	return <p className={cn('text-red-500 text-sm', className)}>{text}</p>;
};

import React, { FC, PropsWithChildren } from 'react';
import { Skeleton } from '../ui/skeleton';

type Props = {
	skeletonClassName?: string;
	loading: boolean;
};

export const SkeletonFieldWrapper: FC<PropsWithChildren<Props>> = ({
	skeletonClassName,
	loading,
	children,
}) => {
	return <>{loading ? <Skeleton className={skeletonClassName} /> : children}</>;
};

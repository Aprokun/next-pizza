'use client';

import { FC } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '@/components/shared/modals/choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '@/components/shared/modals/choose-pizza-form';
import { cn } from '@/shared/lib/utils';

type Props = {
	product: ProductWithRelations;
	className?: string;
};

export const ChooseProductModal: FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const isPizzaForm = Boolean(product.items[0].pizzaType);
	const { imageUrl, name } = product;

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className,
				)}
			>
				{isPizzaForm ? (
					<ChoosePizzaForm
						name={name}
						imageUrl={imageUrl}
						ingredients={product.ingredients}
						items={product.items}
					/>
				) : (
					<ChooseProductForm imageUrl={imageUrl} name={name} ingredients={product.ingredients} />
				)}
			</DialogContent>
		</Dialog>
	);
};
